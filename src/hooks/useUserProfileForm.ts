import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { UserGendersEnum } from '../constants/api'

const userProfileSchema = z.object({
	fullName: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().optional(),
	gender: z
		.object({
			label: z.string(),
			value: z.nativeEnum(UserGendersEnum),
		})
		.or(z.undefined()),
	age: z.string().optional(),
})
type UserProfileForm = z.infer<typeof userProfileSchema>
export type UserProfileFormReturn = UseFormReturn<UserProfileForm>

export const useUserProfileForm = () => {
	return useForm<UserProfileForm>({
		defaultValues: {
			fullName: '',
			email: '',
			phone: '',
			gender: undefined,
			age: '',
		},
		resolver: zodResolver(userProfileSchema),
	})
}
