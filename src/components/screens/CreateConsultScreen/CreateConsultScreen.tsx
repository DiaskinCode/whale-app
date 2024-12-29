import { useConsultForm } from '@/src/hooks/useConsultForm'
import { useTheme } from '@/src/hooks/useTheme'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '../../atoms/Button'
import { BottomSpace } from '../../layouts/BottomSpace'
import { BottomView } from '../../layouts/BottomView'
import { ConsultForm } from '../../molecules/ConsultForm'

import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useState } from 'react'

import { FileTypesEnum } from '@/src/constants/api'
import { consultApi } from '@/src/services/api/consult'
import { fileApi } from '@/src/services/api/file'
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useTranslation } from 'react-i18next'

export const CreateConsultScreen = () => {
	const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null)
	const form = useConsultForm()
	const primaryColor = useTheme().primary
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	const handleAddPhoto = async () => {
		try {
			const resLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync()
			const resCamera = await ImagePicker.requestCameraPermissionsAsync()

			if (!resLibrary.granted || !resCamera.granted) {
				return
			}

			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				cameraType: ImagePicker.CameraType.back,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 1,
				legacy: true,
			})

			if (result.assets) {
				setPhoto(result.assets[0])
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = form.handleSubmit(async data => {
		try {
			let fileId: string | undefined
			if (photo) {
				const fileRes = await fileApi.postOne({
					file: {
						uri: photo.uri,
						name: photo.fileName,
						type: photo.mimeType,
					},
					type: FileTypesEnum.Avatar,
				})
				fileId = fileRes.record.id
			}
			await consultApi.postUserOne({
				clinicName: data.clinic,
				doctorName: data.doctor,
				service: data.service,
				appointmentAt: new Date(data.appointmentAt),
				complaints: data.complaints,
				anamnesis: data.anamnesis,
				allergies: data.allergies,
				diagnosis: data.diagnosis,
				recommendations: data.recommendations,
				medicationIds: data.medications,
				nextAppointmentAt: data.nextAppointmentAt
					? new Date(data.nextAppointmentAt)
					: undefined,
				photoId: fileId,
			})
			navigation.push('Home')
		} catch (error) {
			console.log(error)
		}
	})

	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					<ConsultForm form={form} />
					{photo && (
						<View
							style={{
								width: 200,
								gap: 10,
							}}
						>
							<Image
								style={{
									aspectRatio: 1,
								}}
								source={{ uri: photo.uri }}
								borderRadius={5}
							/>
							<Button variantSize='sm' onPress={() => setPhoto(null)}>
								<AntDesign name='delete' size={24} color='#fff' />
							</Button>
						</View>
					)}
				</View>
				<BottomSpace style={{ height: 131 }} />
			</ScrollView>
			<BottomView style={styles.bottom}>
				<Button
					style={{
						borderColor: primaryColor,
						borderWidth: 1,
					}}
					variantColor='white'
					onPress={handleAddPhoto}
				>
					<Text
						style={{
							fontSize: 16,
							fontWeight: '500',
							color: primaryColor,
						}}
					>
						{t('CONSULT_FORM_PHOTO_LABEL')}
					</Text>
				</Button>
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
	bottom: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
