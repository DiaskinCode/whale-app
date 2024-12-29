import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import {
	MedicationDoseValuesEnum,
	MedicationDurationValuesEnum,
	MedicationReceptionDaysEnum,
} from '../constants/api'

const userMedicationSchema = z.object({
	medication: z.any(),
	startAt: z.string(),
	dose: z.number(),
	doseValue: z.object({
		label: z.string(),
		value: z.nativeEnum(MedicationDoseValuesEnum),
	}),
	duration: z.number(),
	durationValue: z.object({
		label: z.string(),
		value: z.nativeEnum(MedicationDurationValuesEnum),
	}),
	days: z.array(z.nativeEnum(MedicationReceptionDaysEnum)),
	times: z.array(z.string()),
	isReminder: z.boolean(),
})
type UserMedicationSchema = z.infer<typeof userMedicationSchema>
export type UserMedicationFormReturn = UseFormReturn<UserMedicationSchema>

export const useUserMedicationForm = () => {
	return useForm<UserMedicationSchema>({
		defaultValues: {
			startAt: new Date().toISOString(),
			dose: 0,
			duration: 0,
			days: [],
			times: [],
			isReminder: true,
		},
		resolver: zodResolver(userMedicationSchema),
	})
}
