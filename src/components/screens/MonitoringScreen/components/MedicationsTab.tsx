import { Tab } from '@/src/components/atoms/Tab'
import { TListResponse, TMedicationPlanEntity } from '@/src/types/api'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UseQueryResult } from 'react-query'
import { MedicationPlanListCard } from './MedicationPlanListCard'

interface MedicationTabProps {
	medicationPlanVitaminList: UseQueryResult<
		TListResponse<TMedicationPlanEntity>
	>
	medicationPlanMedicineList: UseQueryResult<
		TListResponse<TMedicationPlanEntity>
	>
}

export const MedicationTab = ({
	medicationPlanVitaminList,
	medicationPlanMedicineList,
}: MedicationTabProps) => {
	const [activeTab, setActiveTab] = useState<number>(0)
	const { t } = useTranslation()

	return (
		<Tab
			tabs={[t('COMMON_VITAMINS'), t('COMMON_MEDICINES')]}
			activeTab={activeTab}
			onSelectTab={setActiveTab}
		>
			<MedicationPlanListCard
				title={t('COMMON_VITAMINS')}
				description={t('MONITORING_TAB_1_DESCRIPTION')}
				medicationPlanList={medicationPlanVitaminList}
			/>
			<MedicationPlanListCard
				title={t('COMMON_MEDICINES')}
				description={t('MONITORING_TAB_2_DESCRIPTION')}
				medicationPlanList={medicationPlanMedicineList}
			/>
		</Tab>
	)
}
