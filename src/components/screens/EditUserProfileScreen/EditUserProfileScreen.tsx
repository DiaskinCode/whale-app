import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useUserProfileForm } from '@/src/hooks/useUserProfileForm'
import { sessionStore } from '@/src/stores/session'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '../../atoms/Button'
import { BottomSheetRef } from '../../layouts/BottomSheet'
import { BottomSpace } from '../../layouts/BottomSpace'
import { BottomView } from '../../layouts/BottomView'
import { DeleteAccountBottomSheet } from '../../layouts/DeleteAccountBottomSheet'
import { UserProfileForm } from '../../molecules/UserProfileForm'
import { LanguageSelect } from '../WelcomeScreen/components/LanguageSelect'
import { AvatarEdit } from './components/AvatarEdit'

export const EditUserProfileScreen = observer(() => {
	const { account, updateAccountAction } = sessionStore
	const form = useUserProfileForm()
	const deleteAccountBottomSheetRef = useRef<BottomSheetRef | null>(null)
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	const handleSubmit = form.handleSubmit(async data => {
		try {
			await updateAccountAction({
				fullName: data?.fullName,
				email: !!data?.email ? data?.email : null,
				phone: data?.phone,
				userGender: data?.gender?.value,
				userAge: !!data?.age ? Number(data?.age) : null,
			})
			navigation.navigate('Home', { screen: 'UserProfile' })
		} catch (error) {
			console.log(error)
			form.setError('root', { message: t('EDIT_PROFILE_ERROR') })
		}
	})

	useEffect(() => {
		if (!account) return
		if (account.fullName) {
			form.setValue('fullName', account.fullName!)
		}
		if (account.email) {
			form.setValue('email', account.email!)
		}
		if (account.phone) {
			form.setValue('phone', account.phone!)
		}
		if (account.userGender) {
			form.setValue('gender', {
				label: account.userGender,
				value: account.userGender,
			})
		}
		if (account.userAge) {
			form.setValue('age', String(account.userAge))
		}
	}, [account])

	return (
		<>
			<SafeAreaView style={styles.safeArea} edges={['bottom']}>
				<ScrollView style={styles.scrollView}>
					<View style={styles.content}>
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 15,
							}}
						>
							<UserProfileForm form={form} />
							<LanguageSelect hasTitle={false} />
							<Button
								variantSize='sm'
								variantStyle='outline'
								variantColor='red'
								onPress={() => deleteAccountBottomSheetRef.current?.expand()}
							>
								{t('EDIT_PROFILE_DELETE_BUTTON')}
							</Button>
						</View>
					</View>
					<BottomSpace />
				</ScrollView>
				<BottomView>
					<Button
						variantColor='green'
						disabled={form.formState.isSubmitting || !form.formState.isValid}
						onPress={handleSubmit}
					>
						{t('COMMON_SAVE')}
					</Button>
				</BottomView>
			</SafeAreaView>
			<DeleteAccountBottomSheet ref={deleteAccountBottomSheetRef} />
		</>
	)
})

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
})
