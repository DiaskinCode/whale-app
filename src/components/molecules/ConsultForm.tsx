import { ConsultFormReturn } from '@/src/hooks/useConsultForm'
import { useTheme } from '@/src/hooks/useTheme'
import { accountApi } from '@/src/services/api/account'
import { clinicApi } from '@/src/services/api/clinic'
import { medicationApi } from '@/src/services/api/medication'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { format } from 'date-fns'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { magicModal, MagicModalHideReason } from 'react-native-magic-modal'
import { useQuery } from 'react-query'
import { Collapsible } from '../atoms/Collapsible'
import { Dropdown, MultiSelect } from '../atoms/DropDown'
import { Field } from '../atoms/Field'
import { Input } from '../atoms/Input'
import { TouchableButton } from '../atoms/TouchableButton'
import {
	DatePickerModal,
	DatePickerModalReturn,
} from '../layouts/DatePickerModal'

interface ConsultFormProps {
	form: ConsultFormReturn
}

export const ConsultForm = ({ form }: ConsultFormProps) => {
	const [doctorSearch, setDoctorSearch] = useState<string>('')
	const [clinicSearch, setClinicSearch] = useState<string>('')
	const [medicationSearch, setMedicationSearch] = useState<string>('')
	const primaryColor = useTheme().primary
	const secondaryColor = useTheme().secondary
	const { t } = useTranslation()

	const medicationListQuery = useQuery({
		queryKey: ['medicationList', medicationSearch],
		queryFn: async () => {
			const res = await medicationApi.getAll({
				pagination: {
					page: 1,
					pageSize: 10,
				},
				search: {
					title: {
						like: medicationSearch,
					},
				},
				relations: {},
			})
			return res
		},
	})

	return (
		<View style={styles.container}>
			<Controller
				control={form.control}
				name='clinic'
				render={({ field:{ onChange, ...field }, fieldState }) => (
					<Field
						label={t('CONSULT_FORM_CLINIC_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							textContentType='name'
							returnKeyType='next'
							placeholder={t('CONSULT_FORM_CLINIC_PLACEHOLDER')}
							onChangeText={onChange}
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='doctor'
				render={({ field:{ onChange, ...field }, fieldState }) => (
					<Field
						label={t('CONSULT_FORM_DOCTOR_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							textContentType='name'
							returnKeyType='next'
							placeholder={t('CONSULT_FORM_DOCTOR_PLACEHOLDER')}
							onChangeText={onChange}
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='service'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('CONSULT_FORM_SERVICE_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							textContentType='name'
							returnKeyType='next'
							placeholder={t('CONSULT_FORM_SERVICE_PLACEHOLDER')}
							onChangeText={onChange}
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='appointmentAt'
				render={({ field: { onChange, value, ...field }, fieldState }) => (
					<Field
						label={t('CONSULT_FORM_APPOINTMENT_AT_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							as={Pressable}
							textContentType='name'
							returnKeyType='next'
							placeholder={t('CONSULT_FORM_APPOINTMENT_AT_PLACEHOLDER')}
							onChangeText={onChange}
							leftIcon={
								<AntDesign name='calendar' size={24} color={primaryColor} />
							}
							rightIcon={
								<TouchableButton
									onPress={() => form.resetField('appointmentAt')}
								>
									<Entypo
										name='circle-with-cross'
										size={20}
										color={secondaryColor}
									/>
								</TouchableButton>
							}
							value={value ? format(value, 'dd.MM.yyyy') : ''}
							onPress={async event => {
								event.preventDefault()
								const res = (await magicModal.show(
									() => <DatePickerModal defaultDate={value} />,
									{
										swipeDirection: undefined,
									}
								).promise) as any
								const data = res.data as DatePickerModalReturn
								if (
									res.reason === MagicModalHideReason.INTENTIONAL_HIDE &&
									data?.date
								) {
									onChange(data.date)
								}
							}}
							{...field}
						/>
					</Field>
				)}
			/>
			<Collapsible>
				<View style={styles.container}>
					<Controller
						control={form.control}
						name='complaints'
						render={({ field: { onChange, ...field }, fieldState }) => (
							<Field
								label={t('CONSULT_FORM_COMPLAINTS_LABEL')}
								error={
									fieldState.error?.message ? t(fieldState.error.message) : ''
								}
							>
								<Input
									returnKeyType='next'
									placeholder={t('CONSULT_FORM_COMPLAINTS_PLACEHOLDER')}
									onChangeText={onChange}
									{...field}
								/>
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name='anamnesis'
						render={({ field: { onChange, ...field }, fieldState }) => (
							<Field
								label={t('CONSULT_FORM_ANAMNESIS_LABEL')}
								error={
									fieldState.error?.message ? t(fieldState.error.message) : ''
								}
							>
								<Input
									returnKeyType='next'
									placeholder={t('CONSULT_FORM_ANAMNESIS_PLACEHOLDER')}
									onChangeText={onChange}
									{...field}
								/>
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name='allergies'
						render={({ field: { onChange, ...field }, fieldState }) => (
							<Field
								label={t('CONSULT_FORM_ALLERGIES_LABEL')}
								error={
									fieldState.error?.message ? t(fieldState.error.message) : ''
								}
							>
								<Input
									returnKeyType='next'
									placeholder={t('CONSULT_FORM_ALLERGIES_PLACEHOLDER')}
									onChangeText={onChange}
									{...field}
								/>
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name='diagnosis'
						render={({ field: { onChange, ...field }, fieldState }) => (
							<Field
								label={t('CONSULT_FORM_DIAGNOSIS_LABEL')}
								error={
									fieldState.error?.message ? t(fieldState.error.message) : ''
								}
							>
								<Input
									returnKeyType='next'
									placeholder={t('CONSULT_FORM_DIAGNOSIS_PLACEHOLDER')}
									onChangeText={onChange}
									{...field}
								/>
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name='recommendations'
						render={({ field: { onChange, ...field }, fieldState }) => (
							<Field
								label={t('CONSULT_FORM_RECOMMENDATIONS_LABEL')}
								error={
									fieldState.error?.message ? t(fieldState.error.message) : ''
								}
							>
								<Input
									returnKeyType='next'
									placeholder={t('CONSULT_FORM_RECOMMENDATIONS_PLACEHOLDER')}
									onChangeText={onChange}
									{...field}
								/>
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name='medications'
						render={({ field, fieldState }) => (
							<Field
								label={t('CONSULT_FORM_MEDICATIONS_LABEL')}
								error={
									fieldState.error?.message ? t(fieldState.error.message) : ''
								}
							>
								<MultiSelect
									mode='modal'
									placeholder={t('CONSULT_FORM_MEDICATIONS_PLACEHOLDER')}
									labelField='title'
									valueField='id'
									data={medicationListQuery.data?.records ?? []}
									search
									searchPlaceholder={t('COMMON_SEARCH')}
									onChangeText={setMedicationSearch}
									searchQuery={() => true}
									disable={!medicationListQuery.data}
									renderSelectedItem={item => (
										<View
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												padding: 5,
												margin: 5,
												borderRadius: 10,
												backgroundColor: '#fff',
											}}
										>
											<Text
												style={{
													fontSize: 16,
													fontWeight: '500',
													color: secondaryColor,
												}}
											>
												{item.title}
											</Text>
										</View>
									)}
									renderInputSearch={onSearch => (
										<Input onChangeText={onSearch} placeholder='Поиск' />
									)}
									{...field}
								/>
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name='nextAppointmentAt'
						render={({ field: { onChange, value, ...field }, fieldState }) => (
							<Field
								label={t('CONSULT_FORM_NEXT_APPOINTMENT_AT_LABEL')}
								error={
									fieldState.error?.message ? t(fieldState.error.message) : ''
								}
							>
								<Input
									as={Pressable}
									textContentType='name'
									returnKeyType='next'
									placeholder={t(
										'CONSULT_FORM_NEXT_APPOINTMENT_AT_PLACEHOLDER'
									)}
									onChangeText={onChange}
									leftIcon={
										<AntDesign name='calendar' size={24} color={primaryColor} />
									}
									rightIcon={
										<TouchableButton
											onPress={() => form.resetField('nextAppointmentAt')}
										>
											<Entypo
												name='circle-with-cross'
												size={20}
												color={secondaryColor}
											/>
										</TouchableButton>
									}
									value={value ? format(value, 'dd.MM.yyyy') : ''}
									onPress={async event => {
										event.preventDefault()
										const res = (await magicModal.show(
											() => <DatePickerModal defaultDate={value} />,
											{
												swipeDirection: undefined,
											}
										).promise) as any
										const data = res.data as DatePickerModalReturn
										if (
											res.reason === MagicModalHideReason.INTENTIONAL_HIDE &&
											data?.date
										) {
											onChange(data.date)
										}
									}}
									{...field}
								/>
							</Field>
						)}
					/>
				</View>
			</Collapsible>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
