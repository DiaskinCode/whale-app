import { EMOJIES } from '@/src/components/layouts/SetUserHealthStateModal'
import { useTheme } from '@/src/hooks/useTheme'
import { THealthStateEntity, TListResponse } from '@/src/types/api'
import { useTranslation } from 'react-i18next'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { UseQueryResult } from 'react-query'

interface HealthStateStatisticsProps {
	healthStateList: UseQueryResult<TListResponse<THealthStateEntity>>
}

export const HealthStateStatistics = ({
	healthStateList,
}: HealthStateStatisticsProps) => {
	const primaryColor = useTheme().primary
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={[styles.title, { color: primaryColor }]}>
					{t('COMMON_HEALTH_STATES')}
				</Text>
			</View>
			<FlatList
				horizontal
				contentContainerStyle={{ paddingHorizontal: 8, gap: 16 }}
				style={{
					paddingVertical: 8,
				}}
				data={EMOJIES}
				keyExtractor={item => item.value}
				renderItem={({ item }) => {
					let healthStatePercentage = 0
					if (healthStateList.data?.records) {
						const healthStateFilter = healthStateList.data.records.filter(
							healthState => healthState.state === item.value
						)
						healthStatePercentage =
							healthStateFilter.length / healthStateList.data.records.length
					}

					return (
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Image source={item.source} style={{ width: 30, height: 30 }} />
							<Text style={{ fontSize: 14, fontWeight: '500', color: '#aaa' }}>
								{(healthStatePercentage * 100).toFixed(0)}%
							</Text>
						</View>
					)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',

		borderRadius: 10,
		backgroundColor: '#fff',
	},
	titleContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 8,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		backgroundColor: '#DBE2FD',
	},
	title: {
		fontSize: 14,
		fontWeight: '600',
	},
	emojies: {
		display: 'flex',
		flexDirection: 'row',
	},
})
