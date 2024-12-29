import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const SplashScreen = () => {
	const { bottom } = useSafeAreaInsets()

	const getPlatformBottom = () => {
		if (Platform.OS === 'ios') {
			return bottom
		}
		return bottom + 8
	}

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require('@/assets/images/splash-logo.png')}
			/>

			<View style={[styles.version, { bottom: getPlatformBottom() }]}>
				<Text style={styles.versionText}>Version 1.0.0</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		flex: 1,
		resizeMode: 'center',
	},
	version: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		position: 'absolute',
		bottom: 8,
		left: 0,
	},
	versionText: {
		fontSize: 14,
		color: '#ccc',
	},
})