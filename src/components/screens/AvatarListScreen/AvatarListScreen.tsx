import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '../../atoms/Button'
import { BottomSpace } from '../../layouts/BottomSpace'
import { BottomView } from '../../layouts/BottomView'
import { AvatarList } from './components/AvatarList'

import { FileTypesEnum } from '@/src/constants/api'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { avatarApi } from '@/src/services/api/avatar'
import { fileApi } from '@/src/services/api/file'
import { sessionStore } from '@/src/stores/session'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { AvatarAdd } from './components/AvatarAdd'

export const AvatarListScreen = () => {
	const { account, updateAccountAction } = sessionStore
	const [selectAvatarId, setSelectAvatarId] = useState<string | undefined>()
	const [pickImage, setPickImage] = useState<
		ImagePicker.ImagePickerAsset | undefined
	>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	const publicAvatarListQuery = useQuery({
		queryKey: ['publicAvatarList'],
		queryFn: async () => {
			const res = await avatarApi.getPublicAll({
				// pagination: {
				// 	page: 1,
				// 	pageSize: 10,
				// },
				relations: {
					file: true,
				},
			})
			return res
		},
	})

	const handleSelectAvatarId = (avatarId: string) => {
		setSelectAvatarId(avatarId)
		setPickImage(undefined)
	}

	const handleSave = async () => {
		try {
			setIsLoading(true)
			if (selectAvatarId && !pickImage) {
				await updateAccountAction({
					userAvatarId: selectAvatarId,
				})
			} else if (!selectAvatarId && pickImage?.uri && pickImage.fileName) {
				const fileRes = await fileApi.postOne({
					file: {
						uri: pickImage.uri,
						name: pickImage.fileName,
						type: pickImage.mimeType,
					},
					type: FileTypesEnum.Avatar,
				})
				const avatarRes = await avatarApi.postOne({
					fileId: fileRes.record.id,
				})
				await updateAccountAction({
					userAvatarId: avatarRes.record.id,
				})
			}
			navigation.navigate('Home', { screen: 'UserProfile' })
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (
			!account?.userAvatar?.file ||
			!publicAvatarListQuery.data?.records?.length
		)
			return

		if (
			publicAvatarListQuery.data.records.findIndex(
				item => item.id === account.userAvatar?.id
			) === -1
		) {
			setPickImage({
				uri: account.userAvatar.file.url!,
				fileName: account.userAvatar.file.name!,
				mimeType: account.userAvatar.file.type!,
				width: account.userAvatar.file.size!,
				height: account.userAvatar.file.size!,
			})
		} else {
			setSelectAvatarId(account.userAvatar.id)
		}
	}, [account?.userAvatar, publicAvatarListQuery.data])

	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					<Text style={styles.title}>{t('AVATAR_LIST_SUBTITLE')}</Text>
					<AvatarList
						avatarList={publicAvatarListQuery}
						selectAvatarId={selectAvatarId}
						setSelectAvatarId={handleSelectAvatarId}
						additional={
							<AvatarAdd
								pickImage={pickImage}
								setPickImage={setPickImage}
								setSelectAvatarId={setSelectAvatarId}
							/>
						}
					/>
				</View>
				<BottomSpace />
			</ScrollView>
			<BottomView>
				<Button
					variantColor='green'
					disabled={isLoading || (!selectAvatarId && !pickImage)}
					onPress={handleSave}
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
		gap: 32,
		paddingVertical: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: '#ccc',
		textAlign: 'center',
	},
})
