import { Avatar } from '@/src/components/atoms/Avatar'
import { SelectButton } from '@/src/components/atoms/SelectButton'
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { View } from 'react-native'

interface AvatarAddProps {
	pickImage: ImagePicker.ImagePickerAsset | undefined
	setPickImage: (pickImage: ImagePicker.ImagePickerAsset | undefined) => void
	setSelectAvatarId: (avatarId: string | undefined) => void
}

export const AvatarAdd = ({
	pickImage,
	setPickImage,
	setSelectAvatarId,
}: AvatarAddProps) => {
	const handlePickImage = async () => {
		const permissionRes =
			await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (!permissionRes.granted) {
			return
		}

		const pickerRes = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			cameraType: ImagePicker.CameraType.back,
			selectionLimit: 1,
			allowsMultipleSelection: false,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			base64: false,
			legacy: true,
		})
		if (!pickerRes?.assets?.length) return

		setSelectAvatarId(undefined)
		setPickImage(pickerRes.assets[0])
	}

	return (
		<View
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 10,
			}}
		>
			<View style={{ flex: 1 }} />
			<SelectButton
				style={{
					flex: 1,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					aspectRatio: 1,
					backgroundColor: '#fff',
					borderRadius: 1000,
				}}
				isActive={!!pickImage}
				onPress={handlePickImage}
			>
				{!pickImage ? (
					<AntDesign name='plus' size={34} color='#000' />
				) : (
					<Avatar
						style={{ flex: 1, aspectRatio: 1, borderRadius: 1000 }}
						source={{ uri: pickImage.uri }}
					/>
				)}
			</SelectButton>
			<View style={{ flex: 1 }} />
		</View>
	)
}
