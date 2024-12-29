import { useForgotPasswordForm } from '@/src/hooks/useForgotPasswordForm'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, ViewProps } from 'react-native'
import { Field } from '../atoms/Field'
import { FieldError } from '../atoms/FieldError'
import { Input } from '../atoms/Input'

interface ForgotPasswordFormProps extends ViewProps {
	form: ReturnType<typeof useForgotPasswordForm> // Use the correct return type
}

export const ForgotPasswordForm = ({ style, form, ...props }: ForgotPasswordFormProps) => {
	const { t } = useTranslation()

	return (
		<View style={[styles.container, style]} {...props}>
			<Controller
				control={form.control}
				name='email'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('FORGOT_PASSWORD_EMAIL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							textContentType='emailAddress'
							returnKeyType='next'
							keyboardType='email-address'
							placeholder={t('SIGNUP_FORM_EMAIL_LABEL')}
							onChangeText={onChange}
							autoFocus
							{...field}
						/>
					</Field>
				)}
			/>
			{form.formState.errors.root && (
				<FieldError>{form.formState.errors.root.message}</FieldError>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},
})
