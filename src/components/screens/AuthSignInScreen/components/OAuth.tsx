import { ENV } from '@/src/configs'
import { LangsEnum } from '@/src/constants/api'
import { sessionStore } from '@/src/stores/session'
import { AntDesign } from '@expo/vector-icons'
import { useAuthRequest } from 'expo-auth-session/build/providers/Google'
import * as WebBrowser from 'expo-web-browser'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { OAuthButton } from './OAuthButton'

WebBrowser.maybeCompleteAuthSession()

export const OAuth = observer(() => {
	const { googleLoginAction } = sessionStore
	const { t } = useTranslation()

	const [request, response, googleSignIn] = useAuthRequest({
		webClientId: ENV.GOOGLE_WEB_CLIENT_ID,
		iosClientId: ENV.GOOGLE_IOS_CLIENT_ID,
		androidClientId: ENV.GOOGLE_ANDROID_CLIENT_ID,
		scopes: ['email', 'profile'],
	})

	const handleGoogleLogin = async () => {
		try {
			if (response?.type !== 'success' || !response?.authentication?.idToken) {
				return
			}

			await googleLoginAction({
				idToken: response.authentication.idToken,
				lang: LangsEnum.Ru,
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		handleGoogleLogin()
	}, [response])

	// const handleGoogleLogin = async () => {
	// 	try {
	// 		await GoogleSignin.hasPlayServices()
	// 		const res = await GoogleSignin.signIn()
	// 		if (isSuccessResponse(res) && res.data) {
	// 			await googleLoginAction({
	// 				idToken: res.data.idToken!,
	// 				lang: LangsEnum.Ru,
	// 			})
	// 		}
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	return (
		<View style={styles.buttons}>
			{/* <OAuthButton
				variantSize='sm'
				variantColor='black'
				icon={<AntDesign name='apple1' size={24} color='#fff' />}
			>
				Войти через Apple
			</OAuthButton> */}
			{/* <OAuthButton
				variantSize='sm'
				variantColor='red'
				icon={<AntDesign name='googleplus' size={24} color='#fff' />}
				onPress={() => {
					googleSignIn()
				}}
			>
				{t('SIGNIN_GOOGLE_BUTTON')}
			</OAuthButton> */}
		</View>
	)
})

const styles = StyleSheet.create({
	buttons: {
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},
})
