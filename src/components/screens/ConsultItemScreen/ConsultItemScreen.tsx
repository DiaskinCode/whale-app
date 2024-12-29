import { consultApi } from '@/src/services/api/consult'
import { useRoute } from '@react-navigation/native'
import * as Sharing from 'expo-sharing'
import { useRef } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'

import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { captureRef } from 'react-native-view-shot'
import { Button } from '../../atoms/Button'
import { BottomSpace } from '../../layouts/BottomSpace'
import { BottomView } from '../../layouts/BottomView'
import { ConsultCardItem } from '../ConsultListScreen/components/ConsultCardItem'

export const ConsultItemScreen = () => {
	const { params } = useRoute()
	const id = (params as any)?.id
	const viewRef = useRef<View>(null)
	const { t } = useTranslation()

	const consultQuery = useQuery({
		queryKey: ['consult', id],
		queryFn: async () => {
			const res = await consultApi.getUserOne(id, {
				relations: {
					clinic: true,
					doctorAccount: true,
					photo: true,
				},
			})
			return res.record
		},
	})

	const handleCaptureAndSave = async () => {
		try {
			const imageUri = await captureRef(viewRef, {
				format: 'png',
				quality: 1,
			})

			await Sharing.shareAsync(imageUri, {
				mimeType: 'application/png',
				dialogTitle: t('CONSULT_ITEM_CAPTURE_AND_SAVE'),
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					{consultQuery.isLoading ? (
						<></>
					) : !consultQuery.data ? (
						<></>
					) : (
						<View
							ref={viewRef}
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 10,
								width: '100%',
								padding: 20,
								borderRadius: 10,
								backgroundColor: '#fff',
							}}
						>
							<ConsultCardItem
								title={`${t('COMMON_CLINIC')}:`}
								description={consultQuery.data.clinic?.title ?? ''}
							/>
							<ConsultCardItem
								title={`${t('COMMON_DOCTOR')}:`}
								description={
									consultQuery.data.doctorAccount?.doctorSpecialization ?? ''
								}
							/>
							<ConsultCardItem
								title={`${t('COMMON_DOCTOR_FULL_NAME')}:`}
								description={consultQuery.data.doctorAccount?.fullName ?? ''}
							/>
							<ConsultCardItem
								title={`${t('COMMON_SERVICE')}:`}
								description={consultQuery.data.service ?? ''}
							/>
							<ConsultCardItem
								title={`${t('COMMON_APPOINTMENT')}:`}
								description={
									consultQuery.data.appointmentAt
										? format(consultQuery.data.appointmentAt, 'dd.MM.yyyy')
										: ''
								}
							/>
							<View
								style={{
									width: '100%',
									height: 1,
									backgroundColor: '#eee',
									marginVertical: 10,
								}}
							/>
							<ConsultCardItem
								title={`${t('COMMON_NEXT_APPOINTMENT')}:`}
								description={
									consultQuery.data.nextAppointmentAt
										? format(consultQuery.data.nextAppointmentAt, 'dd.MM.yyyy')
										: t('COMMON_NOT_DEFINED')
								}
							/>
							<ConsultCardItem
								title={`${t('COMMON_COMPLAINTS')}:`}
								description={
									consultQuery.data.complaints
										? consultQuery.data.complaints
										: t('COMMON_NOT_DEFINED')
								}
							/>
							<ConsultCardItem
								title={`${t('COMMON_ANAMNESIS')}:`}
								description={
									consultQuery.data.anamnesis
										? consultQuery.data.anamnesis
										: t('COMMON_NOT_DEFINED')
								}
							/>
							<ConsultCardItem
								title={`${t('COMMON_ALLERGIES')}:`}
								description={
									consultQuery.data.allergies
										? consultQuery.data.allergies
										: t('COMMON_NOT_DEFINED')
								}
							/>
							<ConsultCardItem
								title={`${t('COMMON_DIAGNOSIS')}:`}
								description={
									consultQuery.data.diagnosis
										? consultQuery.data.diagnosis
										: t('COMMON_NOT_DEFINED')
								}
							/>
							<ConsultCardItem
								title={`${t('COMMON_RECOMMENDATIONS')}:`}
								description={
									consultQuery.data.recommendations
										? consultQuery.data.recommendations
										: t('COMMON_NOT_DEFINED')
								}
							/>
							{consultQuery.data.photo && (
								<View style={{ marginTop: 10 }}>
									<Image
										style={{
											aspectRatio: 1,
											width: '100%',
										}}
										borderRadius={5}
										source={{ uri: consultQuery.data.photo.url }}
									/>
								</View>
							)}
						</View>
					)}
				</View>
				<BottomSpace />
			</ScrollView>
			<BottomView>
				<Button onPress={handleCaptureAndSave}>
					{t('CONSULT_ITEM_CAPTURE_AND_SAVE')}
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
