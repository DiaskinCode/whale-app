import { Empty } from '@/src/components/atoms/Empty'
import { SelectButton } from '@/src/components/atoms/SelectButton'
import { medicationPlanApi } from '@/src/services/api/medication-plan'
import { TListResponse, TMedicationPlanEntity } from '@/src/types/api'
import { StyleSheet, View } from 'react-native'
import { Skeleton } from 'react-native-skeletons'
import { UseQueryResult } from 'react-query'
import { UserMedicationListCard } from './UserMedicationListCard'

interface UserMedicationListProps {
	medicationPlanList: UseQueryResult<TListResponse<TMedicationPlanEntity>>
	selectMedicationPlan: TMedicationPlanEntity | null
	setSelectMedicationPlan: (
		medicationPlan: TMedicationPlanEntity | null
	) => void
}

export const UserMedicationList = ({
	medicationPlanList,
	selectMedicationPlan,
	setSelectMedicationPlan,
}: UserMedicationListProps) => {
	const handleDelete = (medicationPlan: TMedicationPlanEntity) => async () => {
		try {
			await medicationPlanApi.removeUserOne(medicationPlan.id)
			await medicationPlanList.refetch()
			setSelectMedicationPlan(null)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			{medicationPlanList.isLoading ? (
				<Skeleton count={3} width='100%' height={200} color='gray' />
			) : medicationPlanList.data?.records?.length === 0 ? (
				<Empty />
			) : (
				<View style={styles.list}>
					{medicationPlanList.data?.records.map((medicationPlan, index) => (
						<SelectButton
							key={index}
							isActive={selectMedicationPlan?.id === medicationPlan.id}
							onPress={() => setSelectMedicationPlan(medicationPlan)}
						>
							<UserMedicationListCard
								userMedication={medicationPlan}
								onDelete={handleDelete(medicationPlan)}
							/>
						</SelectButton>
					))}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
