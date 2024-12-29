import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

const consultSchema = z.object({
	clinic: z.any(),
	doctor: z.any(),
	service: z.string().min(1, { message: 'REQUIRED' }),
	appointmentAt: z.string().min(1, { message: 'REQUIRED' }),
	complaints: z.string().optional(),
	anamnesis: z.string().optional(),
	allergies: z.string().optional(),
	diagnosis: z.string().optional(),
	recommendations: z.string().optional(),
	medications: z.array(z.any()).optional(),
	nextAppointmentAt: z.string().optional(),
})
type ConsultSchema = z.infer<typeof consultSchema>
export type ConsultFormReturn = UseFormReturn<ConsultSchema>

export const useConsultForm = () => {
	return useForm<ConsultSchema>({
		defaultValues: {
			appointmentAt: new Date().toISOString(),
			medications: [],
		},
		resolver: zodResolver(consultSchema),
	})
}
