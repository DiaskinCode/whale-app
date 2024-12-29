import { ScrollView, StyleSheet, View } from 'react-native'
import { Links } from './components/Links'
import { Logout } from './components/Logout'
import { Navigation } from './components/Navigation'
import { UserProfileInfo } from './components/UserProfileInfo'
import { LanguageSelect } from '../WelcomeScreen/components/LanguageSelect'

export const HomeUserProfileScreen = () => {
	return (
		<ScrollView style={styles.scrollView}>
			<View style={styles.content}>
				<UserProfileInfo />
				<LanguageSelect hasTitle={false} />
				<Navigation />
				<Links />
				<Logout />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		paddingHorizontal: 16,
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		paddingVertical: 16,
	},
})
