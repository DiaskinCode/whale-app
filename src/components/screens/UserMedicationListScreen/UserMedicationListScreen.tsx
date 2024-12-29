import { medicationPlanApi } from '@/src/services/api/medication-plan'
import { TMedicationPlanEntity } from '@/src/types/api'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { BottomSheetRef } from '../../layouts/BottomSheet'
import { UserMedicationBottomSheet } from './components/UserMedicationBottomSheet'
import { UserMedicationList } from './components/UserMedicationList'

export const UserMedicationListScreen = () => {
	const [selectMedicationPlan, setSelectMedicationPlan] =
		useState<TMedicationPlanEntity | null>(null)
	const medicationPlanBottomSheetRef = useRef<BottomSheetRef | null>(null)
	const { t } = useTranslation()

	const medicationPlanListQuery = useQuery({
		queryKey: ['medicationPlanList'],
		queryFn: async () => {
			const res = await medicationPlanApi.getUserAll({
				pagination: {
					page: 1,
					pageSize: 10,
				},
				relations: {
					medication: true,
				},
			})
			return res
		},
	})
	

	return (
		<>
			<SafeAreaView style={styles.safeArea} edges={['bottom']}>
				<ScrollView style={styles.scrollView}>
					<View style={styles.content}>
						<Text style={styles.title}>{t('MEDICATION_LIST_SUBTITLE')}</Text>
						<UserMedicationList
							medicationPlanList={medicationPlanListQuery}
							selectMedicationPlan={selectMedicationPlan}
							setSelectMedicationPlan={medicationPlan => {
								setSelectMedicationPlan(medicationPlan)
								if (medicationPlan) {
									medicationPlanBottomSheetRef.current?.expand()
								} else {
									medicationPlanBottomSheetRef.current?.close()
								}
							}}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
			<UserMedicationBottomSheet
				ref={medicationPlanBottomSheetRef}
				medicationPlan={selectMedicationPlan}
				setMedicationPlan={setSelectMedicationPlan}
			/>
		</>
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
	title: {
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
		color: '#ccc',
	},
})
