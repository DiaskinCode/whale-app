import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { consultApi } from '@/src/services/api/consult'

import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { Button } from '../../atoms/Button'
import { BottomSpace } from '../../layouts/BottomSpace'
import { BottomView } from '../../layouts/BottomView'
import { ConsultList } from './components/ConsultList'

export const ConsultListScreen = () => {
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	const consultListQuery = useQuery({
		queryKey: ['consultList'],
		queryFn: async () => {
			const res = await consultApi.getUserAll({
				pagination: {
					page: 1,
					pageSize: 10,
				},
				relations: {
					clinic: true,
					doctorAccount: true,
				},
			})
			return res
		},
	})
	console.log(consultListQuery);
	

	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					<Text style={styles.description}>
						{t('CONSULT_LIST_DESCRIPTION')}
					</Text>
					<View>
						<ConsultList consultListQuery={consultListQuery} />
					</View>
				</View>
				<BottomSpace />
			</ScrollView>
			<BottomView>
				<Button onPress={() => navigation.push('CreateConsult')}>
					{t('CONSULT_LIST_BUTTON')}
				</Button>
			</BottomView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 16,
	},
	content: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		paddingVertical: 16,
	},
	description: {
		fontSize: 14,
		fontWeight: '600',
		color: '#aaa',
	},
})
