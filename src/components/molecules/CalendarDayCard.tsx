import { MedicationReceptionStatusEnum } from '@/src/constants/api'

import { TMedicationPlanReceptionEntity } from '@/src/types/api'
import { ComponentProps } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { CalendarDay } from './CalendarDay'

interface CalendarDayCardProps
	extends Omit<
		ComponentProps<typeof CalendarDay & typeof TouchableOpacity>,
		'receptionsCount' | 'completedReceptionsCount'
	> {
	receptions: TMedicationPlanReceptionEntity[]
}

export const CalendarDayCard = ({
	receptions,
	...props
}: CalendarDayCardProps) => {
	const receptionsCount = receptions.length
	const completedReceptionsCount = receptions.filter(
		reception => reception.status === MedicationReceptionStatusEnum.Completed
	).length

	const getContainerStyle = () => {
		if (receptionsCount === 0) return {}
		if (receptionsCount === completedReceptionsCount) {
			return { backgroundColor: '#30CE49' }
		}
		if (receptionsCount > completedReceptionsCount) {
			return { backgroundColor: '#FA8E55' }
		}
		if (completedReceptionsCount === 0) {
			return { backgroundColor: '#E85087' }
		}
	}

	return (
		<CalendarDay
			style={[styles.container, getContainerStyle()]}
			receptionsCount={receptionsCount}
			completedReceptionsCount={completedReceptionsCount}
			{...props}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		borderRadius: 10,
	},
})
