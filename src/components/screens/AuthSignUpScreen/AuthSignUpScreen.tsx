import { Button } from '@/src/components/atoms/Button'
import { LinkButton } from '@/src/components/atoms/LinkButton'
import { BottomSpace } from '@/src/components/layouts/BottomSpace'
import { BottomView } from '@/src/components/layouts/BottomView'
import { SignUpForm } from '@/src/components/molecules/SignUpForm'
import { AccountRolesEnum, LangsEnum } from '@/src/constants/api'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useSignUpForm } from '@/src/hooks/useSignUpForm'
import { useTheme } from '@/src/hooks/useTheme'
import { sessionStore } from '@/src/stores/session'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'

export const AuthSignUpScreen = observer(() => {
	const { userRegisterAction } = sessionStore
	const form = useSignUpForm()
	const primaryColor = useTheme().primary
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	const handleSignUp = form.handleSubmit(async data => {
		try {
			const res = await userRegisterAction({
				email: data.email,
				// phone: data.phone,
				password: data.password,
				role: AccountRolesEnum.User,
				lang: LangsEnum.Ru,
			})
			navigation.push('SignIn', { fromSignUp: true, email:data.email });
		} catch (error) {
			console.log(error)
			if (error instanceof AxiosError) {
				if (error.response?.status === 409) {
					form.setError('root', {
						message: 'SIGNUP_ERROR',
					})
					return
				}
			}

			form.setError('root', { message: 'COMMON_ERROR' })
		}
	})

	return (
		<>
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					<SignUpForm form={form} />
					<View style={styles.signIn}>
						<LinkButton
							color={primaryColor}
							onPress={() => navigation.push('SignIn')}
						>
							{t('SIGNUP_SIGNIN_BUTTON')}
						</LinkButton>
					</View>
				</View>
				<BottomSpace />
			</ScrollView>
			<BottomView>
				<Button onPress={handleSignUp}>{t('SIGNUP_BUTTON')}</Button>
			</BottomView>
		</>
	)
})

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		paddingHorizontal: 16,
	},
	content: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 20,
		paddingVertical: 16,
	},
	signIn: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
