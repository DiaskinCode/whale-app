import { Button } from '@/src/components/atoms/Button'
import { Line } from '@/src/components/atoms/Line'
import { LinkButton } from '@/src/components/atoms/LinkButton'
import { BottomSpace } from '@/src/components/layouts/BottomSpace'
import { BottomView } from '@/src/components/layouts/BottomView'
import { ForgotPasswordForm } from '@/src/components/molecules/ForgotPasswordForm'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useForgotPasswordForm } from '@/src/hooks/useForgotPasswordForm'
import { useTheme } from '@/src/hooks/useTheme'
import { accountApi } from '@/src/services/api/account'
import { sessionStore } from '@/src/stores/session'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useQuery } from 'react-query'

export const AuthForgotPasswordScreen = observer(() => {
	const { account } = sessionStore
	const { t } = useTranslation()
	
	// Use the forgot password form hook instead of the sign-in form hook
	const form = useForgotPasswordForm()
	const primaryColor = useTheme().primary
	const navigation = useAppNavigation()

    const handleForgotPassword = form.handleSubmit(async data => {
        try {
          // Send the email to the API for password reset
          await accountApi.postUserSendResetCode({ email: data.email })
          navigation.navigate('ResetPassword', { email: data.email });
        } catch (error) {
          console.log(error)
          if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
              form.setError('root', { message: t('FORGOT_PASSWORD_EMAIL_ERROR') })
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
					<View style={styles.form}>
						<ForgotPasswordForm form={form} />
					</View>
				</View>
				<BottomSpace />
			</ScrollView>
			<BottomView>
				<Button onPress={handleForgotPassword}>{t('FORGOT_PASSWORD_BUTTON')}</Button>
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
	form: {
		flex: 1,
	},
})
