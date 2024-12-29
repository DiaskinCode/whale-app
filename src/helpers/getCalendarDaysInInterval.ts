import {
	eachDayOfInterval,
	eachMonthOfInterval,
	eachWeekOfInterval,
	endOfMonth,
	endOfWeek,
	isSameMonth,
	startOfMonth,
	startOfWeek,
	startOfYear,
} from 'date-fns'

export type TFormattedCalendarDays = {
	[key: string]: {
		[key: string]: {
			[key: string]: {
				isCurrentMonth: boolean
				date: Date
			}[]
		}
	}
}

export function getCalendarDaysInInterval(interval: [Date, Date]) {
	const startDate = interval[0]
	const endDate = interval[1]
	const result: TFormattedCalendarDays = {}

	const months = eachMonthOfInterval({
		start: startDate,
		end: endDate,
	})

	months.forEach(monthDate => {
		const year = startOfYear(monthDate).toISOString()
		const month = monthDate.toISOString()
		const weeks = eachWeekOfInterval(
			{
				start: startOfMonth(month),
				end: endOfMonth(month),
			},
			{ weekStartsOn: 1 }
		)

		weeks.forEach(weekDate => {
			const week = weekDate.toISOString()
			const days = eachDayOfInterval({
				start: startOfWeek(week, { weekStartsOn: 1 }),
				end: endOfWeek(week, { weekStartsOn: 1 }),
			})

			days.forEach(day => {
				if (!(year in result)) {
					result[year] = {}
				}
				if (!(month in result[year])) {
					result[year][month] = {}
				}
				if (!(week in result[year][month])) {
					result[year][month][week] = []
				}

				result[year][month][week].push({
					isCurrentMonth: isSameMonth(month, day),
					date: day,
				})
			})
		})
	})

	return { result }
}
