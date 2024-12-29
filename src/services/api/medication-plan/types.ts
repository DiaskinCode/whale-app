import {
	MedicationDoseValuesEnum,
	MedicationDurationValuesEnum,
	MedicationReceptionDaysEnum,
} from '@/src/constants/api'

export type TMedicationPlanCreateDto = {
	startAt: Date
	dose: number
	doseValue: MedicationDoseValuesEnum
	duration: number
	durationValue: MedicationDurationValuesEnum
	days: MedicationReceptionDaysEnum[]
	times: string[]
	isReminder: boolean
	medicationId: string
}

export type TMedicationPlanUpdateDto = Partial<TMedicationPlanCreateDto> &
	Partial<{
		medicationId: string
	}>
