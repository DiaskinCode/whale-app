import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useUserMedicationForm } from '@/src/hooks/useUserMedicationForm'
import { medicationPlanApi } from '@/src/services/api/medication-plan'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '../../atoms/Button'
import { BottomSpace } from '../../layouts/BottomSpace'
import { BottomView } from '../../layouts/BottomView'
import { UserMedicationForm } from '../../molecules/UserMedicationForm'

export const CreateUserMedicationScreen = () => {
	const form = useUserMedicationForm();
	const navigation = useAppNavigation();

	const handleSubmit = form.handleSubmit(async (data) => {
		try {
			const res = await medicationPlanApi.postUserOne({
				startAt: new Date(data.startAt),
				medicationId: data.medication?.id, // Ensure this accesses id safely
				dose: data.dose,
				doseValue: data.doseValue.value,
				duration: data.duration,
				durationValue: data.durationValue.value,
				days: data.days,
				times: data.times,
				isReminder: data.isReminder,
			});
			navigation.push('Home', { screen: 'MedicationCalendar' });
		} catch (error) {
			console.log(error);
		}
	});

	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					<UserMedicationForm 
						form={form} 
						onlyRead={{ medication: false }}
						onSelect={(selectedItem) => {
							console.log('Selected Item:', selectedItem);
						}} 
					/>
				</View>
				<BottomSpace />
			</ScrollView>
			<BottomView>
				<Button
					disabled={form.formState.isSubmitting || !form.formState.isValid}
					onPress={handleSubmit}
				>
					Создать
				</Button>
			</BottomView>
		</SafeAreaView>
	);
};



const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 16,
	},
	content: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		paddingVertical: 16,
	},
})
