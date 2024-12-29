import { useTheme } from '@/src/hooks/useTheme'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, View } from 'react-native'

interface MedicationStatisticsCardProps {
	title: string
	completedPercentage: number
	rejectedPercentage: number
}

export const MedicationStatisticsCard = ({
	title,
	completedPercentage,
	rejectedPercentage,
}: MedicationStatisticsCardProps) => {
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>{title}</Text>
			</View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
					gap: 8,
				}}
			>
				<MedicationStatisticsCardItem
					title={completedPercentage + '%'}
					description={t('COMMON_ACCEPTS')}
				/>
				<MedicationStatisticsCardItem
					title={rejectedPercentage + '%'}
					description={t('COMMON_REJECTS')}
				/>
			</View>
		</View>
	)
}

interface MedicationStatisticsCardItemProps {
	title: string
	description: string
}

const MedicationStatisticsCardItem = ({
	title,
	description,
}: MedicationStatisticsCardItemProps) => {
	const primaryColor = useTheme().primary

	return (
		<View style={[styles.itemContainer, { borderColor: primaryColor }]}>
			<Text style={[styles.itemTitle, { color: primaryColor }]}>{title}</Text>
			<Text style={[styles.itemTitle, { color: primaryColor }]}>
				{description}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		padding: 8,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	image: {},
	title: {
		fontSize: 14,
		fontWeight: '600',
		color: '#000',
	},
	itemContainer: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
		maxHeight:50,
		minWidth:'100%',
		paddingVertical: 6,
		borderWidth: 1,
		borderRadius: 5,
	},
	itemTitle: {
		flex: 1,
		fontSize: 15,
		fontWeight: '500',
	},
	itemText: {
		flex: 1,
		fontSize: 20,
		fontWeight: '400',
	},
})
