import { BottomSheetView } from '@/src/components/atoms/BottomSheetView'
import { Button } from '@/src/components/atoms/Button'
import {
	BottomSheet,
	BottomSheetRef,
} from '@/src/components/layouts/BottomSheet'

import { SetUserHealthStateModal } from '@/src/components/layouts/SetUserHealthStateModal'
import { medicationPlanReceptionApi } from '@/src/services/api/medication-plan-reception'
import { setIsHomeTabVisible } from '@/src/stores/homeTab'
import { THealthStateEntity, TListResponse } from '@/src/types/api'
import { endOfDay, startOfDay } from 'date-fns'
import { Dispatch, forwardRef, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, View } from 'react-native'
import { magicModal } from 'react-native-magic-modal'
import { useQuery, UseQueryResult } from 'react-query'
import { MedicationPlanReceptionTable } from './MedicationPlanReceptionTable'

interface DayBottomSheetProps {
	selectDay: Date | null
	setSelectDay: Dispatch<SetStateAction<Date | null>>
	healthStateList: UseQueryResult<TListResponse<THealthStateEntity>>
}

export const DayBottomSheet = forwardRef<
	BottomSheetRef | null,
	DayBottomSheetProps
>(({ selectDay, setSelectDay, healthStateList }, ref) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { t } = useTranslation()

	const medicationPlanReceptionListQuery = useQuery({
		queryKey: ['medicationPlanReceptionLustQuery', selectDay],
		queryFn: async () => {
			const res = await medicationPlanReceptionApi.getUserAll({
				search: {
					date: {
						from: startOfDay(selectDay!).toISOString(),
						to: endOfDay(selectDay!).toISOString(),
					},
				},
				relations: {
					medicationPlan: {
						medication: true,
					},
				},
			})
			return res
		},
		enabled: !!selectDay,
	})

	const handleIndexChanges = (index: number) => {
		if (index === -1) {
			setSelectDay(null)
			setIsHomeTabVisible(true)
			setIsOpen(false)
			return
		}
		setIsOpen(true)
	}

	// useEffect(() => {
	// 	if (selectDay === null) {
	// 		ref.current?.close()
	// 		setIsHomeTabVisible(true)
	// 		return
	// 	}

	// 	ref.current?.expand()
	// 	setIsHomeTabVisible(false)
	// }, [ref.current, selectDay])

	return (
		<BottomSheet
			ref={ref}
			index={-1}
			style={styles.bottomSheet}
			snapPoints={[380]}
			animateOnMount={false}
			enablePanDownToClose
			onChange={handleIndexChanges}
		>
			{isOpen && selectDay && (
				<BottomSheetView style={styles.container}>
					<MedicationPlanReceptionTable
						medicationPlanReceptionList={medicationPlanReceptionListQuery}
					/>
					<Button
						variantSize='sm'
						onPress={async () => {
							if (!selectDay) return
							const res = (await magicModal.show(
								() => <SetUserHealthStateModal day={selectDay} />,
								{
									swipeDirection: undefined,
								}
							).promise) as any
							await healthStateList.refetch()
						}}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								gap: 8,
							}}
						>
							<Image
								style={{
									width: 30,
									height: 30,
									resizeMode: 'contain',
								}}
								source={require('@/assets/images/good-emoji.png')}
							/>

							<Text
								style={{
									fontSize: 16,
									fontWeight: '600',
									color: '#fff',
								}}
							>
								{t('DAY_BOTTOM_SHEET_BUTTON')}
							</Text>
						</View>
					</Button>
				</BottomSheetView>
			)}
		</BottomSheet>
	)
})

const styles = StyleSheet.create({
	bottomSheet: {
		zIndex: 10000,
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		paddingTop: 16,
	},
})
