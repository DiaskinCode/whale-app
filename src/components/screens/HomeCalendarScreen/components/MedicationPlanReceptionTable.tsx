import { Empty } from '@/src/components/atoms/Empty'
import { TListResponse, TMedicationPlanReceptionEntity } from '@/src/types/api'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { UseQueryResult } from 'react-query'
import { ReceptionStatus } from './ReceptionStatus'

interface MedicationPlanReceptionTableProps {
	medicationPlanReceptionList: UseQueryResult<
		TListResponse<TMedicationPlanReceptionEntity>
	>
}

export const MedicationPlanReceptionTable = ({
	medicationPlanReceptionList,
}: MedicationPlanReceptionTableProps) => {
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<View style={{ display: 'flex', flexDirection: 'row' }}>
				<View
					style={{
						flex: 1,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'flex-start',
					}}
				>
					<Text>{t('DAY_BOTTOM_SHEET_TABLE_TITLE_1')}</Text>
				</View>
				<View
					style={{
						flex: 1,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'flex-start',
					}}
				>
					<Text>{t('DAY_BOTTOM_SHEET_TABLE_TITLE_2')}</Text>
				</View>
				<View
					style={{
						flex: 1,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text>{t('DAY_BOTTOM_SHEET_TABLE_TITLE_3')}</Text>
				</View>
			</View>
			<BottomSheetScrollView style={{ flex: 1 }}>
				{!medicationPlanReceptionList.data?.records.length ? (
					<Empty />
				) : (
					<View
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
						}}
					>
						{medicationPlanReceptionList.data.records.map(
							(reception, index) => (
								<View key={index} style={styles.item}>
									<View
										style={{
											flex: 1,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'flex-start',
										}}
									>
										<Text
											style={{
												fontSize: 16,
												fontWeight: '600',
											}}
										>
											{reception?.medicationPlan?.medication?.title}
										</Text>
									</View>
									<View
										style={{
											flex: 1,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'flex-start',
										}}
									>
										<Text
											style={{
												fontSize: 14,
												fontWeight: '600',
											}}
										>
											{format(reception?.date, 'dd.MM HH:mm')}
										</Text>
									</View>
									<ReceptionStatus
										status={reception?.status}
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									/>
								</View>
							)
						)}
					</View>
				)}
			</BottomSheetScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
	item: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
	},
})
