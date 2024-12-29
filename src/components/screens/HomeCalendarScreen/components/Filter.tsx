import {
	MonthPickerModal,
	MonthPickerModalReturn,
} from '@/src/components/layouts/MonthPickerModal'
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from 'date-fns'
import { StyleSheet, Text, View } from 'react-native'
import { magicModal, MagicModalHideReason } from 'react-native-magic-modal'

import { useTheme } from '@/src/hooks/useTheme'
import { useTranslation } from 'react-i18next'
import { IntervalType, TFilterState } from '../HomeCalendarScreen'
import { FilterSelectButton } from './FilterSelectButton'

interface FilterProps {
	filter: TFilterState
	setFilter: (filter: TFilterState) => void
}

export const Filter = ({ filter, setFilter }: FilterProps) => {
	const primaryColor = useTheme().primary
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<FilterSelectButton
				isActive={filter.type === IntervalType.CurrentMonth}
				onPress={() =>
					setFilter({
						type: IntervalType.CurrentMonth,
						interval: [startOfMonth(new Date()), endOfMonth(new Date())],
					})
				}
			>
				<Text
					style={[
						styles.text,
						{
							color:
								filter.type === IntervalType.CurrentMonth
									? primaryColor
									: '#aaa',
						},
					]}
				>
					{t('COMMON_CURRENT_MONTH')}
				</Text>
			</FilterSelectButton>
			<FilterSelectButton
				isActive={filter.type === IntervalType.CurrentYear}
				onPress={() =>
					setFilter({
						type: IntervalType.CurrentYear,
						interval: [startOfYear(new Date()), endOfYear(new Date())],
					})
				}
			>
				<Text
					style={[
						styles.text,
						{
							color:
								filter.type === IntervalType.CurrentYear
									? primaryColor
									: '#aaa',
						},
					]}
				>
					{t('COMMON_CURRENT_YEAR')}
				</Text>
			</FilterSelectButton>
			<FilterSelectButton
				isActive={filter.type === IntervalType.Custom}
				onPress={async () => {
					const res = (await magicModal.show(() => <MonthPickerModal />, {
						swipeDirection: undefined,
					}).promise) as any
					const data = res.data as MonthPickerModalReturn
					if (
						res.reason === MagicModalHideReason.INTENTIONAL_HIDE &&
						data?.month
					) {
						setFilter({
							type: IntervalType.Custom,
							interval: [
								startOfMonth(new Date(data.month)),
								endOfMonth(new Date(data.month)),
							],
						})
					}
				}}
			>
				<Text
					style={[
						styles.text,
						{
							color:
								filter.type === IntervalType.Custom ? primaryColor : '#aaa',
						},
					]}
				>
					{t('COMMON_CHOOSE')}...
				</Text>
			</FilterSelectButton>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	text: {
		fontSize: 14,
		fontWeight: '600',
	},
})
