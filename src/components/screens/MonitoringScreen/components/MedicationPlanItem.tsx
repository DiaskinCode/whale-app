import { MedicationReceptionStatusEnum } from '@/src/constants/api'
import { TMedicationPlanEntity } from '@/src/types/api'
import { StyleSheet, Text, View } from 'react-native'

interface MedicationItemProps {
	medicationPlan: TMedicationPlanEntity
}

export const MedicationPlanItem = ({ medicationPlan }: MedicationItemProps) => {
	const completedReceptionsCount = medicationPlan.receptions.filter(
		reception => reception.status === MedicationReceptionStatusEnum.Completed
	).length
	const receptionsCount = medicationPlan.receptions.length

	return (
		<View style={styles.container}>
			<View style={styles.left}>
				<Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
					{medicationPlan.medication.title.slice(0, 3)}
				</Text>
			</View>
			<View style={styles.center}>
				<View style={styles.percentageContainer}>
					<Text style={styles.percentageText}>50%</Text>
				</View>
			</View>
			<View style={styles.right}>
				<Text>
					<Text>{completedReceptionsCount}</Text>
					<Text> из </Text>
					<Text>{receptionsCount}</Text>
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		gap: 4,
	},
	left: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingVertical: 1.5,
		paddingHorizontal: 13.5,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		backgroundColor: '#666DFB',
	},
	title: {
		width: 30,
		fontSize: 14,
		fontWeight: '500',
		color: '#fff',
	},
	description: {
		fontSize: 14,
		fontWeight: '400',
		color: '#ddd',
	},
	center: {
		flex: 1,
		position: 'relative',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		backgroundColor: '#666dfb7d',
	},
	percentageContainer: {
		width: '50%',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		backgroundColor: '#666dfb',
	},
	percentageText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#fff',
	},
	right: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
})
