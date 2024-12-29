import { SplashScreen } from '@/src/components/screens/SplashScreen/SplashScreen'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { LogBox, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MagicModalPortal } from 'react-native-magic-modal'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClientProvider } from 'react-query'

import * as Notifications from 'expo-notifications'
import { observer } from 'mobx-react-lite'
import Toast from 'react-native-toast-message'
import './src/configs/i18n'
import { queryClientConfig } from './src/configs/queryClient'
import { toastConfig } from './src/configs/toast'
import { useNotifications } from './src/hooks/useNotifications'
import { AppNavigator } from './src/navigator'
import { sessionStore } from './src/stores/session'
import ExpoMixpanelAnalytics from '@benawad/expo-mixpanel-analytics';

LogBox.ignoreLogs(['Require cycle:', 'Since strict-mode is enabled'])



Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
		priority: Notifications.AndroidNotificationPriority.HIGH,
	}),
})

const App = observer(() => {
	const { account, getSessionFromStorageAction } = sessionStore
	const [appLoaded, setAppLoaded] = useState<boolean>(false)
	const [fontLoaded] = useFonts({
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
	})
	const analytics = new ExpoMixpanelAnalytics("0ebb5169afcfcd335336b86278b5ffd3");

	useEffect(() => {
		analytics.track("App Loaded", { platform: "iOS", version: "1.0.0" });

		const prepareApp = async () => {
			try {
				await getSessionFromStorageAction()
				await new Promise(resolve => setTimeout(resolve, 1000))
				setAppLoaded(true)
			} catch (error) {
				console.log(error)
			}
		}

		prepareApp()
	}, [])

	useNotifications(account)

	return (
		<QueryClientProvider client={queryClientConfig}>
			<GestureHandlerRootView style={styles.gesture}>
				<SafeAreaProvider style={styles.container}>
					{!appLoaded || !fontLoaded ? <SplashScreen /> : <AppNavigator />}
					<StatusBar style='auto' />
					<MagicModalPortal />
					<Toast config={toastConfig} />
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	)
})

export default App

const styles = StyleSheet.create({
	gesture: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
})
