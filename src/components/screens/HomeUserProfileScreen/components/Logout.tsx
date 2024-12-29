import { CardLinkButton } from '@/src/components/atoms/CardLinkButton'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useTheme } from '@/src/hooks/useTheme'
import { sessionStore } from '@/src/stores/session'

import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

export const Logout = observer(() => {
	const { logoutAction } = sessionStore
	const navigation = useAppNavigation()
	const redColor = useTheme().red
	const { t } = useTranslation()

	const handleLogout = async () => {
		await logoutAction()
		navigation.reset({
			index: 0,
			routes: [
				{ name: 'Welcome' },
				{ name: 'Home', params: { screen: 'Index' } },
				{ name: 'SignIn' },
			],
		})
	}

	return (
		<CardLinkButton
			color='#000'
			icon={<Ionicons name='log-out-outline' size={20} color={redColor} />}
			hasArrow={false}
			title={t('HOME_PROFILE_LOGOUT')}
			variantColor='white'
			onPress={handleLogout}
		/>
	)
})
