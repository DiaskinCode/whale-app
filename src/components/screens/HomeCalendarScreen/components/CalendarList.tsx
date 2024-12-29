import { SelectButton } from '@/src/components/atoms/SelectButton'
import { CalendarDayCard } from '@/src/components/molecules/CalendarDayCard'
import { LangsEnum } from '@/src/constants/api'
import { DateLocales } from '@/src/constants/date-locales'
import { TFormattedCalendarDays } from '@/src/helpers/getCalendarDaysInInterval'
import { getColumnData } from '@/src/helpers/getColumnData'
import { useTheme } from '@/src/hooks/useTheme'
import {
	THealthStateEntity,
	TListResponse,
	TMedicationPlanReceptionEntity,
} from '@/src/types/api'
import { format, isSameDay } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { UseQueryResult } from 'react-query'

interface CalendarListProps {
	intervalDays: TFormattedCalendarDays
	medicationPlanReceptionList: UseQueryResult<
		TListResponse<TMedicationPlanReceptionEntity>
	>
	healthStateList: UseQueryResult<TListResponse<THealthStateEntity>>
	selectDay: Date | null
	setSelectDay: (day: Date | null) => void
}

export const CalendarList = ({
	intervalDays,
	medicationPlanReceptionList,
	healthStateList,
	selectDay,
	setSelectDay,
}: CalendarListProps) => {
	const primaryColor = useTheme().primary
	const secondaryColor = useTheme().secondary
	const years = Object.keys(intervalDays)
	const { i18n } = useTranslation()

	return (
		<View
			style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}
		>
			{years.map(year => {
				const months = Object.keys(intervalDays[year])

				return (
					<View
						key={year}
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
						}}
					>
						<View
							style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}
						>
							<Text style={{ color: primaryColor, fontSize: 28 }}>
								{format(year, 'yyyy')}
							</Text>
							<Text
								style={{
									color: secondaryColor,
									fontSize: 20,
									paddingBottom: 3,
								}}
							>
								{format(months[0], 'MMMM', {
									locale: DateLocales[i18n.language as LangsEnum] as any,
								})}
							</Text>
						</View>
						{months.map((month, index) => (
							<View
								key={month}
								style={{
									flex: 1,
									display: 'flex',
									flexDirection: 'column',
									gap: 16,
								}}
							>
								{index !== 0 && (
									<Text
										style={{
											color: primaryColor,
											fontSize: 20,
											paddingBottom: 3,
										}}
									>
										{format(month, 'MMMM', {
											locale: DateLocales[i18n.language as LangsEnum] as any,
										})}
									</Text>
								)}
								{Object.keys(intervalDays[year][month]).map(week => {
									return (
										<FlatList
											key={week}
											scrollEnabled={false}
											numColumns={7}
											contentContainerStyle={{ gap: 4 }}
											columnWrapperStyle={{ gap: 4 }}
											data={getColumnData(intervalDays[year][month][week], 7)}
											renderItem={({ item }) => {
												if (!item || !item.isCurrentMonth) {
													return <View style={{ flex: 1 }} />
												}

												const receptions =
													medicationPlanReceptionList?.data?.records.filter(
														reception => isSameDay(reception.date, item.date)
													) ?? []
												const healthState = healthStateList?.data?.records.find(
													healthState => isSameDay(healthState.date, item.date)
												)

												return (
													<SelectButton
														style={{ flex: 1 }}
														isActive={
															!!selectDay && isSameDay(item.date, selectDay)
														}
													>
														<CalendarDayCard
															as={TouchableOpacity}
															date={item.date}
															receptions={receptions}
															healthState={healthState?.state ?? undefined}
															onPress={() => setSelectDay(item.date)}
														/>
													</SelectButton>
												)
											}}
										/>
									)
								})}
							</View>
						))}
					</View>
				)
			})}
		</View>
	)
}
