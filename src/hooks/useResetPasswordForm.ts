import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Schema for reset password form (includes 'code' and 'newPassword')
const resetPasswordSchema = z.object({
  code: z.string().nonempty({ message: 'REQUIRED' }), // Assuming the code is required
  newPassword: z.string().min(6, { message: 'PASSWORD_MIN_LENGTH' }).nonempty({ message: 'REQUIRED' }), // Password should have a minimum length
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordFormReturn = UseFormReturn<ResetPasswordSchema>;

export const useResetPasswordForm = () => {
  return useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });
};
