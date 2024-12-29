import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

const signUpSchema = z
	.object({
		email: z
			.string({ required_error: 'REQUIRED' })
			.email({ message: 'INVALID_EMAIL' }),
		password: z
			.string({ required_error: 'REQUIRED' })
			.min(6, { message: 'PASSWORD_TOO_SHORT' }),
		confirmPassword: z
			.string({ required_error: 'REQUIRED' })
			.min(6, { message: 'PASSWORD_TOO_SHORT' }),
		isAgree: z.boolean({ required_error: 'REQUIRED' }),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				path: ['confirmPassword'],
				message: 'PASSWORDS_DO_NOT_MATCH',
			})
		}
	})
type SignUpSchema = z.infer<typeof signUpSchema>
export type SignUpFormReturn = UseFormReturn<SignUpSchema>

export const useSignUpForm = () => {
	return useForm<SignUpSchema>({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(signUpSchema),
	})
}
