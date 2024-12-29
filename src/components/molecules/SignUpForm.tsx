import { SignUpFormReturn } from '@/src/hooks/useSignUpForm'
import { useTheme } from '@/src/hooks/useTheme'
import * as WebBrowser from 'expo-web-browser'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { Checkbox } from '../atoms/Checkbox'
import { Field } from '../atoms/Field'
import { FieldError } from '../atoms/FieldError'
import { Input } from '../atoms/Input'
import { TouchableButton } from '../atoms/TouchableButton'

interface SignUpFormProps {
	form: SignUpFormReturn
}

export const SignUpForm = ({ form }: SignUpFormProps) => {
	const primaryColor = useTheme().primary
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<Controller
				control={form.control}
				name='email'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('SIGNUP_FORM_EMAIL_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							textContentType='emailAddress'
							returnKeyType='next'
							dataDetectorTypes='address'
							keyboardType='email-address'
							placeholder={t('SIGNUP_FORM_EMAIL_PLACEHOLDER')}
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
						label={t('SIGNUP_FORM_PASSWORD_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							textContentType='newPassword'
							returnKeyType='next'
							placeholder={t('SIGNUP_FORM_PASSWORD_PLACEHOLDER')}
							secureTextEntry
							onChangeText={onChange}
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='confirmPassword'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('SIGNUP_FORM_CONFIRM_PASSWORD_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							textContentType='newPassword'
							returnKeyType='send'
							placeholder={t('SIGNUP_FORM_CONFIRM_PASSWORD_PLACEHOLDER')}
							secureTextEntry
							onChangeText={onChange}
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='isAgree'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'flex-start',
								gap: 8,
								marginTop: 16,
							}}
						>
							<Checkbox onValueChange={onChange} {...field} />
							<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
								<Text style={{ fontSize: 14, fontWeight: '500' }}>
									{t('SIGNUP_FORM_IS_AGREE_LABEL')}{' '}
								</Text>
								<TouchableButton
									onPress={() =>
										WebBrowser.openBrowserAsync(
											'https://whalehealth.app/service-conditions/'
										)
									}
								>
									<Text
										style={{
											fontSize: 14,
											fontWeight: '500',
											color: primaryColor,
											textDecorationLine: 'underline',
										}}
									>
										{t('COMMON_PRIVACY_POLICY')}{' '}
									</Text>
								</TouchableButton>
								<Text style={{ fontSize: 14, fontWeight: '500' }}>
									{t('COMMON_AND')}{' '}
								</Text>
								<TouchableButton
									onPress={() =>
										WebBrowser.openBrowserAsync(
											'https://whalehealth.app/privacy-policy/'
										)
									}
								>
									<Text
										style={{
											fontSize: 14,
											fontWeight: '500',
											color: primaryColor,
											textDecorationLine: 'underline',
										}}
									>
										{t('COMMON_TERMS_OF_USE')}
									</Text>
								</TouchableButton>
							</View>
						</View>
					</Field>
				)}
			/>
			{form.formState.errors.root && (
				<FieldError>
					{form.formState.errors.root.message
						? t(form.formState.errors.root.message)
						: ''}
				</FieldError>
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
