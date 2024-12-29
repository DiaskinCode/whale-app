import { SignInFormReturn } from '@/src/hooks/useSignInForm'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, ViewProps } from 'react-native'
import { Field } from '../atoms/Field'
import { FieldError } from '../atoms/FieldError'
import { Input } from '../atoms/Input'

interface SignInFormProps extends ViewProps {
	form: SignInFormReturn
}

export const SignInForm = ({ style, form, ...props }: SignInFormProps) => {
	const { t } = useTranslation()

	return (
		<View style={[styles.container, style]} {...props}>
			<Controller
				control={form.control}
				name='email'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('SIGNIN_FORM_EMAIL_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							textContentType='emailAddress'
							returnKeyType='next'
							dataDetectorTypes='address'
							keyboardType='email-address'
							placeholder={t('SIGNIN_FORM_EMAIL_PLACEHOLDER')}
							onChangeText={onChange}
							autoFocus
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='password'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('SIGNIN_FORM_PASSWORD_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							textContentType='password'
							returnKeyType='send'
							placeholder={t('SIGNIN_FORM_PASSWORD_PLACEHOLDER')}
							secureTextEntry
							onChangeText={onChange}
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
