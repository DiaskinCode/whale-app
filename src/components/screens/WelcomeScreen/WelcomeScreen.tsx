import { Button } from '@/src/components/atoms/Button'
import { BottomSpace } from '@/src/components/layouts/BottomSpace'
import { BottomView } from '@/src/components/layouts/BottomView'
import { useTheme } from '@/src/hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'

import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IntroCardList } from './components/IntroCardList'
import { LanguageSelect } from './components/LanguageSelect'

export const WelcomeScreen = () => {
	const navigation = useAppNavigation()
	const theme = useTheme()
	const { t } = useTranslation()

	return (
		<LinearGradient
			style={styles.background}
			colors={[theme.primary, theme.secondary]}
		>
			<ScrollView style={styles.scrollView}>
				<SafeAreaView style={styles.container}>
					<View style={styles.logoContainer}>
						<Image
							style={styles.logo}
							source={require('@/assets/images/welcome-logo.png')}
						/>
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
						}}
					>
						<Text style={styles.title}>{t('WELCOME_TITLE')}</Text>
						<LanguageSelect />
					</View>

					<IntroCardList />
				</SafeAreaView>
				<BottomSpace />
			</ScrollView>
			<BottomView>
				<Button
					variantColor='green'
					onPress={() =>
						navigation.push('Home', {
							screen: 'Index',
						})
					}
				>
					{t('COMMON_CONTINUE')}
				</Button>
			</BottomView>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 16,
	},
	container: {
		flex: 1,
		position: 'relative',
		paddingVertical: 16,
	},
	logoContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		resizeMode: 'contain',
	},
	title: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: 32,
		lineHeight: 48,
		fontWeight: '900',
		color: '#fff',
	},
})
