import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

const signInSchema = z.object({
	email: z.string({ required_error: 'REQUIRED' }),
	// .email({ message: 'INVALID-EMAIL' }),
	password: z
		.string({ required_error: 'REQUIRED' })
		.min(6, { message: 'MIN-LENGTH-6' }),
})
export type SignInSchema = z.infer<typeof signInSchema>
export type SignInFormReturn = UseFormReturn<SignInSchema>

export const useSignInForm = () => {
	return useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
	})
}
