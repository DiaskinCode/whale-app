import { Empty } from '@/src/components/atoms/Empty'
import { TListResponse, TMedicationPlanEntity } from '@/src/types/api'
import { StyleSheet, Text, View } from 'react-native'
import { UseQueryResult } from 'react-query'
import { MedicationPlanItem } from './MedicationPlanItem'

interface MedicationPlanListCardProps {
	title: string
	description: string
	medicationPlanList: UseQueryResult<TListResponse<TMedicationPlanEntity>>
}

export const MedicationPlanListCard = ({
	title,
	description,
	medicationPlanList,
}: MedicationPlanListCardProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
			{medicationPlanList.isLoading ? (
				<></>
			) : !medicationPlanList.data?.records?.length ? (
				<Empty />
			) : (
				<View style={styles.list}>
					{medicationPlanList.data.records.map(medicationPlan => (
						<MedicationPlanItem
							key={medicationPlan.id}
							medicationPlan={medicationPlan}
						/>
					))}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		paddingHorizontal: 8,
		paddingVertical: 16,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	header: {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000',
	},
	description: {
		fontSize: 14,
		fontWeight: '400',
		color: '#aaa',
	},
	list: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
