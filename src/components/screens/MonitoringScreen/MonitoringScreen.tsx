import {
	MedicationReceptionStatusEnum,
	MedicationTypesEnum,
} from '@/src/constants/api'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { healthStateApi } from '@/src/services/api/health-state'
import { medicationPlanApi } from '@/src/services/api/medication-plan'
import { TMedicationPlanReceptionEntity } from '@/src/types/api'
import { AntDesign } from '@expo/vector-icons'
import { useState,useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { Button } from '../../atoms/Button'
import { BottomSpace } from '../../layouts/BottomSpace'
import { BottomView } from '../../layouts/BottomView'
import { Filter } from '../HomeCalendarScreen/components/Filter'
import {
	INITIAL_FILTER_STATE,
	TFilterState,
} from '../HomeCalendarScreen/HomeCalendarScreen'
import { HealthStateStatistics } from './components/HealthStateStatistics'
import { MedicationTab } from './components/MedicationsTab'
import { MedicationStatisticsCard } from './components/MedicationStatisticsCard'
import * as ScreenCapture from 'expo-screen-capture';

export const MonitoringScreen = () => {
	const [filter, setFilter] = useState<TFilterState>(INITIAL_FILTER_STATE)
	const navigation = useAppNavigation()
	const { t } = useTranslation()
	
	useEffect(() => {
		const blockScreenCapture = async () => {
		  await ScreenCapture.preventScreenCaptureAsync();
		};
	
		blockScreenCapture();
	  }, []);

	const medicationPlanVitaminListQuery = useQuery({
		queryKey: ['medicationPlanVitaminList', filter],
		queryFn: async () => {
			const res = await medicationPlanApi.getUserAll({
				pagination: {
					page: 1,
					pageSize: 10,
				},
				search: {
					medication: {
						type: MedicationTypesEnum.Vitamin,
					},
					startAt: {
						from: filter.interval[0].toISOString(),
						to: filter.interval[1].toISOString(),
					},
				},
				relations: {
					medication: true,
					receptions: true,
				},
			})
			return res
		},
	})
	const medicationPlanMedicineListQuery = useQuery({
		queryKey: ['medicationPlanMedicineList'],
		queryFn: async () => {
			const res = await medicationPlanApi.getUserAll({
				pagination: {
					page: 1,
					pageSize: 10,
				},
				search: {
					medication: {
						type: MedicationTypesEnum.Medicine,
					},
				},
				relations: {
					medication: true,
					receptions: true,
				},
			})
			return res
		},
	})
	const healthStateListQuery = useQuery({
		queryKey: ['healthStateList', filter],
		queryFn: async () => {
			const res = await healthStateApi.getUserAll({
				search: {
					date: {
						from: filter.interval[0].toISOString(),
						to: filter.interval[1].toISOString(),
					},
				},
			})
			return res
		},
	})

	const vitaminReceptions = medicationPlanVitaminListQuery.data
		? medicationPlanVitaminListQuery.data.records.reduce(
				(acc, item) => [...acc, ...item.receptions],
				[] as TMedicationPlanReceptionEntity[]
		  )
		: []
	const medicineReceptions = medicationPlanMedicineListQuery.data
		? medicationPlanMedicineListQuery.data.records.reduce(
				(acc, item) => [...acc, ...item.receptions],
				[] as TMedicationPlanReceptionEntity[]
		  )
		: []

	const vitaminReceptionsCount = vitaminReceptions.length
	const completedVitaminReceptionsCount = vitaminReceptions.filter(
		reception => reception.status === MedicationReceptionStatusEnum.Completed
	).length
	const rejectedVitaminReceptionsCount = vitaminReceptions.filter(
		reception => reception.status === MedicationReceptionStatusEnum.Skipped
	).length

	const medicineReceptionsCount = medicineReceptions.length
	const completedMedicineReceptionsCount = medicineReceptions.filter(
		reception => reception.status === MedicationReceptionStatusEnum.Completed
	).length
	const rejectedMedicineReceptionsCount = medicineReceptions.filter(
		reception => reception.status === MedicationReceptionStatusEnum.Skipped
	).length
	  

	const completedVitaminReceptionsPercentage =
	!completedVitaminReceptionsCount || !medicineReceptionsCount
		? 0
		: Math.round((completedVitaminReceptionsCount / medicineReceptionsCount) * 10) / 10;

	const rejectedVitaminReceptionsPercentage =
		!rejectedVitaminReceptionsCount || !vitaminReceptionsCount
			? 0
			: Math.round((rejectedVitaminReceptionsCount / vitaminReceptionsCount) * 10) / 10;

	const completedMedicineReceptionsPercentage =
		!completedMedicineReceptionsCount || !medicineReceptionsCount
			? 0
			: Math.round((completedMedicineReceptionsCount / medicineReceptionsCount) * 10) / 10;

	const rejectedMedicineReceptionsPercentage =
		!rejectedMedicineReceptionsCount || !medicineReceptionsCount
			? 0
			: Math.round((rejectedMedicineReceptionsCount / medicineReceptionsCount) * 10) / 10;

	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					<Filter filter={filter} setFilter={setFilter} />
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							gap: 8,
						}}
					>
						<MedicationStatisticsCard
							title={t('MONITORING_CARD_1_TITLE')}
							completedPercentage={completedVitaminReceptionsPercentage}
							rejectedPercentage={rejectedVitaminReceptionsPercentage}
						/>
						<MedicationStatisticsCard
							title={t('MONITORING_CARD_2_TITLE')}
							completedPercentage={completedMedicineReceptionsPercentage}
							rejectedPercentage={rejectedMedicineReceptionsPercentage}
						/>
					</View>
					<View>
						<HealthStateStatistics healthStateList={healthStateListQuery} />
					</View>
					<View>
						<MedicationTab
							medicationPlanVitaminList={medicationPlanVitaminListQuery}
							medicationPlanMedicineList={medicationPlanMedicineListQuery}
						/>
					</View>
				</View>
				<BottomSpace />
			</ScrollView>
			<BottomView>
				<Button
					onPress={() =>
						navigation.push('MonitoringReport', {
							from: filter.interval[0].toISOString(),
							to: filter.interval[1].toISOString(),
						})
					}
				>
					<View style={styles.button}>
						<AntDesign name='download' size={20} color='#fff' />
						<Text style={styles.buttonText}>
							{t('MONITORING_DOWNLOAD_BUTTON')}
						</Text>
					</View>
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
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#fff',
	},
})
