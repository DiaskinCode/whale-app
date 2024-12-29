import { UserGendersEnum } from '@/src/constants/api'
import { UserProfileFormReturn } from '@/src/hooks/useUserProfileForm'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Dropdown } from '../atoms/DropDown'
import { Field } from '../atoms/Field'
import { FieldError } from '../atoms/FieldError'
import { Input } from '../atoms/Input'

interface UserProfileFormProps {
	form: UserProfileFormReturn
}

export const UserProfileForm = ({ form }: UserProfileFormProps) => {
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<Controller
				control={form.control}
				name='fullName'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('PROFILE_FORM_FULL_NAME_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							placeholder={t('PROFILE_FORM_FULL_NAME_PLACEHOLDER')}
							returnKeyType='next'
							onChangeText={onChange}
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='email'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('PROFILE_FORM_EMAIL_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							placeholder={t('PROFILE_FORM_EMAIL_PLACEHOLDER')}
							returnKeyType='next'
							onChangeText={onChange}
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='phone'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('PROFILE_FORM_PHONE_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							placeholder={t('PROFILE_FORM_PHONE_PLACEHOLDER')}
							returnKeyType='next'
							onChangeText={onChange}
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='gender'
				render={({ field: { value, onChange, ...field }, fieldState }) => (
					<Field
						label={t('PROFILE_FORM_GENDER_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Dropdown
							labelField='label'
							valueField='value'
							placeholder={t('PROFILE_FORM_GENDER_PLACEHOLDER')}
							data={[
								{ label: 'Мужской', value: UserGendersEnum.Male },
								{ label: 'Женский', value: UserGendersEnum.Female },
							]}
							value={value?.value}
							onChange={onChange}
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='age'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('PROFILE_FORM_AGE_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							placeholder={t('PROFILE_FORM_AGE_PLACEHOLDER')}
							keyboardType='number-pad'
							returnKeyType='send'
							onChangeText={onChange}
							{...field}
						/>
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
