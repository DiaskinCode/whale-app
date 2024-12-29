import {
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { getCalendarDaysInInterval } from '@/src/helpers/getCalendarDaysInInterval'
import { healthStateApi } from '@/src/services/api/health-state'
import { medicationPlanReceptionApi } from '@/src/services/api/medication-plan-reception'
import { setIsHomeTabVisible } from '@/src/stores/homeTab'
import {
	addMonths,
	endOfDay,
	endOfMonth,
	isSameMonth,
	startOfDay,
	startOfMonth,
} from 'date-fns'
import { useQuery } from 'react-query'
import { BottomSheetRef } from '../../layouts/BottomSheet'
import { CalendarList } from './components/CalendarList'
import { DayBottomSheet } from './components/DayBottomSheet'
import { Filter } from './components/Filter'
import { WeekDays } from './components/WeekDays'

// const PARALLAX_HEIGHT = 100
// const SNAP_START_THRESHOLD = 50
// const SNAP_STOP_THRESHOLD = 100

export type TFilterState = {
	type: IntervalType
	interval: [Date, Date]
}

export enum IntervalType {
	CurrentMonth,
	CurrentYear,
	Custom,
}

export const INITIAL_FILTER_STATE: TFilterState = {
	type: IntervalType.CurrentMonth,
	interval: [startOfMonth(new Date()), endOfMonth(new Date())] as [Date, Date],
}

export const HomeCalendarScreen = () => {
	const [selectDay, setSelectDay] = useState<Date | null>(null)
	const [filter, setFilter] = useState<TFilterState>(INITIAL_FILTER_STATE)
	const [lazyInterval, setLazyInterval] = useState<[Date, Date]>([
		startOfMonth(filter.interval[0]),
		endOfMonth(filter.interval[0]),
	])
	const dayBottomSheetRef = useRef<BottomSheetRef | null>(null)

	const intervalDays = useMemo(() => {
		return getCalendarDaysInInterval(lazyInterval)
	}, [lazyInterval])

	const medicationPlanReceptionListQuery = useQuery({
		queryKey: ['medicationPlanReceptionLustQuery', lazyInterval],
		queryFn: async () => {
			const res = await medicationPlanReceptionApi.getUserAll({
				search: {
					date: {
						from: startOfDay(lazyInterval[0]).toISOString(),
						to: endOfDay(lazyInterval[1]).toISOString(),
					},
				},
			})

			return res
		},
		keepPreviousData: true,
	})

	console.log(medicationPlanReceptionListQuery.data?.records);
	

	const healthStateListQuery = useQuery({
		queryKey: ['healthStateList', lazyInterval],
		queryFn: async () => {
			const res = await healthStateApi.getUserAll({
				search: {
					date: {
						from: startOfDay(lazyInterval[0]).toISOString(),
						to: endOfDay(lazyInterval[1]).toISOString(),
					},
				},
			})

			return res
		},
	})

	const renderHeader = useCallback(() => {
		return <Filter filter={filter} setFilter={setFilter} />
	}, [filter])

	const handleLoadMore = () => {
		if (isSameMonth(lazyInterval[1], filter.interval[1])) {
			return
		}

		setLazyInterval(prev => {
			return [prev[0], addMonths(prev[1], 1)]
		})
	}

	const handleScroll = ({
		nativeEvent,
	}: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { layoutMeasurement, contentOffset, contentSize } = nativeEvent

		if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
			handleLoadMore()
		}
	}

	useEffect(() => {
		if (filter.type === IntervalType.CurrentMonth) {
			setLazyInterval([
				startOfMonth(filter.interval[0]),
				endOfMonth(filter.interval[0]),
			])
		} else if (filter.type === IntervalType.CurrentYear) {
			setLazyInterval([
				startOfMonth(filter.interval[0]),
				endOfMonth(addMonths(filter.interval[0], 1)),
			])
		} else if (filter.type === IntervalType.Custom) {
			setLazyInterval([
				startOfMonth(filter.interval[0]),
				endOfMonth(filter.interval[0]),
			])
		}
	}, [filter])

	return (
		<>
			<View style={styles.container}>
				<WeekDays />
				<ScrollView
					style={styles.scrollView}
					onScroll={handleScroll}
					scrollEventThrottle={16}
				>
					<View style={styles.content}>
						{renderHeader()}
						<CalendarList
							intervalDays={intervalDays.result}
							medicationPlanReceptionList={medicationPlanReceptionListQuery}
							healthStateList={healthStateListQuery}
							selectDay={selectDay}
							setSelectDay={day => {
								setSelectDay(day)
								setIsHomeTabVisible(false)
								dayBottomSheetRef.current?.expand()
							}}
						/>
					</View>
					<View style={{ height: 30, width: '100%' }} />
				</ScrollView>
			</View>
			<DayBottomSheet
				ref={dayBottomSheetRef}
				selectDay={selectDay}
				setSelectDay={setSelectDay}
				healthStateList={healthStateListQuery}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
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
})
