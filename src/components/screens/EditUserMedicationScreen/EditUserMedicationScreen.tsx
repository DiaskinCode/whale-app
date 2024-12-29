import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useUserMedicationForm } from '@/src/hooks/useUserMedicationForm'
import { medicationPlanApi } from '@/src/services/api/medication-plan'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { Button } from '../../atoms/Button'
import { BottomSpace } from '../../layouts/BottomSpace'
import { BottomView } from '../../layouts/BottomView'
import { UserMedicationForm } from '../../molecules/UserMedicationForm'

export const EditUserMedicationScreen = () => {
	const { params } = useRoute()
	const id = (params as any)?.id
	const form = useUserMedicationForm()
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	const medicationPlanQuery = useQuery({
		queryKey: ['medicationPlanQuery', id],
		queryFn: async () => {
			const res = await medicationPlanApi.getUserOne(id, {
				relations: {
					medication: true,
				},
			})
			return res
		},
		enabled: !!id,
	})

	const handleSubmit = form.handleSubmit(async data => {
		try {
			await medicationPlanApi.patchUserOne(id, {
				medicationId: data.medication.id,
				startAt: new Date(data.startAt),
				dose: data.dose,
				doseValue: data.doseValue.value,
				duration: data.duration,
				durationValue: data.durationValue.value,
				days: data.days,
				times: data.times,
				isReminder: data.isReminder,
			})
			navigation.navigate('UserMedicationList')
		} catch (error) {
			console.log(error)
			form.setError('root', { message: 'Ошибка сохранения данных' })
		}
	})

	useEffect(() => {
		if (!medicationPlanQuery.data) return
		form.setValue('medication', medicationPlanQuery.data.record.medication)
		form.setValue(
			'startAt',
			new Date(medicationPlanQuery.data.record.startAt).toISOString()
		)
		form.setValue('dose', medicationPlanQuery.data.record.dose)
		form.setValue('doseValue', {
			label: medicationPlanQuery.data.record.doseValue,
			value: medicationPlanQuery.data.record.doseValue,
		})
		form.setValue('duration', medicationPlanQuery.data.record.duration)
		form.setValue('durationValue', {
			label: medicationPlanQuery.data.record.durationValue,
			value: medicationPlanQuery.data.record.durationValue,
		})
		form.setValue('days', medicationPlanQuery.data.record.days)
		form.setValue('times', medicationPlanQuery.data.record.times)
		form.setValue('isReminder', medicationPlanQuery.data.record.isReminder)
	}, [medicationPlanQuery.data])

	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					<UserMedicationForm form={form} onlyRead={{ medication: true }} />
				</View>
				<BottomSpace />
			</ScrollView>
			<BottomView>
				<Button
					disabled={form.formState.isSubmitting || !form.formState.isValid}
					onPress={handleSubmit}
				>
					{t('COMMON_SAVE')}
				</Button>
			</BottomView>
		</SafeAreaView>
	)
}

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
