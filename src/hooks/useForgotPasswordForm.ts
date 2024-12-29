import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

// Schema for forgot password form (only includes 'email')
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'INVALID-EMAIL' }).nonempty({ message: 'REQUIRED' }),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type ForgotPasswordFormReturn = UseFormReturn<ForgotPasswordSchema>

export const useForgotPasswordForm = () => {
  return useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  })
}
