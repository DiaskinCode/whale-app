import {
	MedicationDoseValuesEnum,
	MedicationDurationValuesEnum,
	MedicationReceptionDaysEnum,
} from '@/src/constants/api'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useTheme } from '@/src/hooks/useTheme'
import { UserMedicationFormReturn } from '@/src/hooks/useUserMedicationForm'
import { medicationApi } from '@/src/services/api/medication'
import { AntDesign } from '@expo/vector-icons'
import { format } from 'date-fns'
import { useEffect, useState,useCallback } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Pressable,View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { magicModal, MagicModalHideReason } from 'react-native-magic-modal'
import { useQuery } from 'react-query'
import { BaseButton } from '../atoms/BaseButton'
import { Button } from '../atoms/Button'
import { Checkbox } from '../atoms/Checkbox'
import { Dropdown } from '../atoms/DropDown'
import { Field, FieldLabel } from '../atoms/Field'
import { FieldGroup } from '../atoms/FieldGroup'
import { Input } from '../atoms/Input'
import { SelectButton } from '../atoms/SelectButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import {
	DatePickerModal,
	DatePickerModalReturn,
} from '../layouts/DatePickerModal'
import {
	TimePickerModal,
	TimePickerModalReturn,
} from '../layouts/TimePickerModal'


interface MedicationItem {
	id: string;
	title: string;
  }
  
  interface FormControl {
	control: any;
	setValue: any;
  }
  
  interface UserMedicationFormProps {
	form: FormControl;
	onlyRead: { medication?: boolean };
	onSelect: (item: MedicationItem) => void;
  }
  
  export const UserMedicationForm: React.FC<UserMedicationFormProps> = ({
	form,
	onlyRead,
	onSelect,
}) => {
	const { control, setValue } = form; // Destructure the control and setValue
	const [medicationSearch, setMedicationSearch] = useState<string>('');
	const primaryColor = useTheme().primary;
	const secondaryColor = useTheme().secondary;
	const [selectedMedication, setSelectedMedication] = useState<MedicationItem | null>(null);
	const { t } = useTranslation();
	const [filteredData, setFilteredData] = useState<MedicationItem[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const navigation = useAppNavigation()

	const medicationListQuery = useQuery({
		queryKey: ['medicationList', medicationSearch],
		queryFn: async () => {
			const res = await medicationApi.getAll({
				search: {
					title: {
						like: medicationSearch,
					},
				},
			});
			return res;
		},
		refetchOnWindowFocus: true,
	});

	useFocusEffect(
		useCallback(() => {
			medicationListQuery.refetch();
		}, [])
	);

	useEffect(() => {
		if (medicationListQuery.data?.records) {
			const filtered = medicationListQuery.data.records.filter(item =>
				item.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredData(filtered);
		}
	}, [medicationListQuery.data, searchTerm]);

	const handleSelect = (item: MedicationItem) => {
		setValue('medication', item); // Set the selected medication
		onSelect(item); 
		setSearchTerm(item.title);
		setIsOpen(false);
		setSelectedMedication(item);
	};
	
	
	return (
		<View style={styles.container}>
			<View style={styles.fieldContainer}>

				<Text style={styles.label}>{t('MEDICATION_FORM_MEDICATION_LABEL')}</Text>
				<TouchableOpacity
					style={[styles.dropdown, isOpen && styles.dropdownOpen]}
					onPress={() => setIsOpen(!isOpen)}
					disabled={onlyRead?.medication}
				>
						<Text style={styles.placeholder}>
							{selectedMedication
								? selectedMedication.title
								: t('MEDICATION_FORM_MEDICATION_PLACEHOLDER')}
						</Text>
						<MaterialIcons
							name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
							size={25}
							color="#999"
						/>
				</TouchableOpacity>
				{isOpen && (
					<View style={styles.dropdownContent}>
					<View style={styles.searchContainer}>
						<FontAwesome name="search" size={16} color="#999" style={styles.searchIcon} />
						<TextInput
						style={styles.searchInput}
						value={searchTerm}
						placeholder={t('COMMON_SEARCH')}
						onChangeText={setSearchTerm}
						/>
					</View>
					
					<FlatList
						data={filteredData}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.dropdownItem}
							onPress={() => handleSelect(item)}
						>
							<Text style={styles.itemText}>{item.title}</Text>
						</TouchableOpacity>
						)}
					/>
					</View>
				)}
				</View>
			
			<TouchableOpacity onPress={()=>{navigation.push('CreateOwnUserMedication')}}>
				<Text style={styles.add_own_medication_label}>{t('ADD_MEDICATION_LABEL')}</Text>
			</TouchableOpacity>
			<Controller
				control={form.control}
				name='startAt'
				render={({ field: { onChange, value, ...field }, fieldState }) => (
					<Field
						label={t('MEDICATION_FORM_START_AT_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							as={Pressable}
							placeholder={t('MEDICATION_FORM_START_AT_PLACEHOLDER')}
							onChangeText={onChange}
							rightIcon={
								<AntDesign name='calendar' size={24} color={secondaryColor} />
							}
							value={format(value, 'dd.MM.yyyy')}
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
			<Field label={t('MEDICATION_FORM_DOSE_LABEL')}>
				<FieldGroup>
					<Controller
						control={form.control}
						name='dose'
						render={({ field: { onChange, value, ...field }, fieldState }) => (
							<Field
								error={
									fieldState.error?.message ? t(fieldState.error.message) : ''
								}
							>
								<Input
									keyboardType='number-pad'
									placeholder={t('MEDICATION_FORM_DOSE_PLACEHOLDER')}
									onChangeText={(text: string) =>
										onChange(isNaN(parseInt(text)) ? 0 : parseInt(text))
									}
									value={String(value)}
									{...field}
								/>
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name='doseValue'
						render={({ field, fieldState }) => (
							<Field
								error={
									fieldState.error?.message ? t(fieldState.error.message) : ''
								}
							>
								<Dropdown
									labelField='label'
									valueField='value'
									placeholder={t('COMMON_GRAM_PLACEHOLDER')}
									data={Object.values(MedicationDoseValuesEnum).map(value => ({
										label: t(`COMMON_${value}`),
										value,
									}))}
									{...field}
								/>
							</Field>
						)}
					/>
				</FieldGroup>
			</Field>
			<Field label={t('MEDICATION_FORM_DURATION_LABEL')}>
				<FieldGroup>
					<Controller
						control={form.control}
						name='duration'
						render={({ field: { onChange, value, ...field }, fieldState }) => (
							<Field
								error={
									fieldState.error?.message ? t(fieldState.error.message) : ''
								}
							>
								<Input
									keyboardType='number-pad'
									placeholder={t('MEDICATION_FORM_DURATION_PLACEHOLDER')}
									onChangeText={(text: string) =>
										onChange(isNaN(parseInt(text)) ? 0 : parseInt(text))
									}
									value={String(value)}
									{...field}
								/>
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name='durationValue'
						render={({ field, fieldState }) => (
							<Field
								error={
									fieldState.error?.message ? t(fieldState.error.message) : ''
								}
							>
								<Dropdown
									labelField='label'
									valueField='value'
									placeholder={t('MEDICATION_FORM_DURATION_VALUE_PLACEHOLDER')}
									data={Object.values(MedicationDurationValuesEnum).map(
										value => ({
											label: t(`COMMON_${value}`),
											value,
										})
									)}
									{...field}
								/>
							</Field>
						)}
					/>
				</FieldGroup>
			</Field>
			<Controller
				control={form.control}
				name='days'
				render={({ field: { value, onChange }, fieldState }) => (
					<Field label='Дни приема' error={fieldState.error?.message}>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								flexWrap: 'wrap',
								gap: 8,
							}}
						>
							{Object.values(MedicationReceptionDaysEnum).map(day => {
								const isActive = value.includes(day)

								return (
									<SelectButton
										key={day}
										style={{
											paddingVertical: 8,
											paddingHorizontal: 16,
										}}
										isActive={isActive}
										onPress={() => {
											if (value?.includes(day)) {
												onChange(value.filter(v => v !== day))
											} else {
												onChange([...value, day])
											}
										}}
									>
										<Text
											style={{
												fontWeight: '500',
												color: isActive ? primaryColor : secondaryColor,
											}}
										>
											{t(`COMMON_${day}`)}
										</Text>
									</SelectButton>
								)
							})}
						</View>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='times'
				render={({ field: { value, onChange }, fieldState }) => (
					<Field
						label={t('MEDICATION_FORM_TIMES_LABEL')}
						error={fieldState.error?.message}
					>
						<View
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								gap: 16,
							}}
						>
							<Button
								variantSize='sm'
								onPress={async () => {
									try {
										const res = (await magicModal.show(
											() => <TimePickerModal />,
											{
												swipeDirection: undefined,
											}
										).promise) as any
										const data = res.data as TimePickerModalReturn
										if (res.reason === MagicModalHideReason.INTENTIONAL_HIDE) {
											onChange([
												...value.filter(v => v !== data.time),
												data.time,
											])
										}
									} catch (error) {
										console.log('error',error)
									}
								}}
							>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										gap: 16,
									}}
								>
									<AntDesign name='pluscircleo' size={24} color='#fff' />
									<Text
										style={{ fontSize: 16, fontWeight: '500', color: '#fff' }}
									>
										{t('MEDICATION_FORM_TIMES_ADD')}
									</Text>
								</View>
							</Button>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									flexWrap: 'wrap',
									gap: 8,
								}}
							>
								{value.map((time, index) => (
									<BaseButton
										key={index}
										variantColor='white'
										style={{
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'center',
											gap: 10,
											padding: 10,
											borderRadius: 10,
											borderColor: secondaryColor,
											borderWidth: 1,
										}}
										onPress={() => {
											onChange(value.filter(v => v !== time))
										}}
									>
										<Text style={{ color: primaryColor }}>{time}</Text>
										<AntDesign
											name='closecircle'
											size={18}
											color={secondaryColor}
										/>
									</BaseButton>
								))}
							</View>
						</View>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='isReminder'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
							}}
						>
							<FieldLabel>{t('MEDICATION_FORM_IS_REMINDER_LABEL')}</FieldLabel>
							<Checkbox onValueChange={onChange} {...field} />
						</View>
					</Field>
				)}
			/>
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
	fieldContainer: {
		marginBottom: 10,
	  },
	  label: {
		fontSize: 16,
		color: '#333',
		marginBottom: 5,
	  },
	  add_own_medication_label: {
		fontSize: 16,
		fontWeight:'500',
		color: '#676DF2',
		marginTop:-15,
		marginBottom:15,
	  },
	  dropdown: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: '#ccc',
		flexDirection:'row',
		justifyContent:'space-between',
		borderRadius: 10,
		backgroundColor: '#fff',
	  },
	  dropdownOpen: {
		borderColor: '#007bff',
	  },
	  placeholder: {
		color: '#999',
		fontSize: 16,
		marginTop:3,
	  },
	  dropdownContent: {
		marginTop: 5,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
		backgroundColor: '#fff',
		maxHeight: 325,
	  },
	  searchInput: {
		padding: 15,
		width:'100%',
	  },
	  dropdownItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	  },
	  searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	  },
	  searchIcon: {
		marginLeft: 15,
	  },
	  itemText: {
		fontSize: 16,
		color: '#333',
	  },
	  errorText: {
		color: 'red',
		marginTop: 5,
	  },
})
