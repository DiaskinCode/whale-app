import { SortEnum } from '@/src/constants/api'

import { AntDesign } from '@expo/vector-icons'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { BottomSheetView } from '../atoms/BottomSheetView'
import { Button } from '../atoms/Button'
import { Dropdown } from '../atoms/DropDown'
import { BottomSheet, BottomSheetRef } from './BottomSheet'

interface FilterBottomSheetProps {
	sortByOptions: { label: string; value: string }[]
	defaultSortBy: any
	defaultSort: any
	onFilter: (args: { sortBy: string; sort: SortEnum }) => void
}

export const FilterBottomSheet = forwardRef<
	BottomSheetRef | null,
	FilterBottomSheetProps
>(({ sortByOptions, defaultSortBy, defaultSort, onFilter }, ref) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectSortBy, setSelectSortBy] = useState<string>(defaultSortBy)
	const [selectSort, setSelectSort] = useState<SortEnum>(defaultSort)
	const { t } = useTranslation()

	const handleIndexChanges = (index: number) => {
		if (index === -1) {
			setIsOpen(false)
			return
		}
		setIsOpen(true)
	}

	const handleFilter = () => {
		onFilter({
			sortBy: 'createdAt',
			sort: SortEnum.DESC,
		})
	}
	console.log(ref)

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
			{isOpen && (
				<BottomSheetView style={styles.container}>
					<View
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							gap: 10,
						}}
					>
						<Dropdown
							placeholder={t('COMMON_SORT_BY')}
							labelField='label'
							valueField='value'
							data={sortByOptions}
							value={selectSortBy}
							onChange={setSelectSortBy}
						/>
						<Dropdown
							placeholder={t('COMMON_SORT')}
							labelField='label'
							valueField='value'
							data={[
								{
									label: t('COMMON_DESC'),
									value: SortEnum.DESC,
								},
								{
									label: t('COMMON_ASC'),
									value: SortEnum.ASC,
								},
							]}
							value={selectSort}
							onChange={setSelectSort}
						/>
					</View>
					<Button onPress={handleFilter}>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								gap: 15,
							}}
						>
							<AntDesign name='search1' size={24} color='#fff' />
							<Text
								style={{
									fontSize: 16,
									fontWeight: '600',
									color: '#fff',
								}}
							>
								{t('COMMON_FILTER')}
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
		flex: 1,
	},
})
