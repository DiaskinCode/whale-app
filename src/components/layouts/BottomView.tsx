import { StyleSheet, View, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface BottomViewProps extends ViewProps {}

export const BottomView = ({ children, style, ...props }: BottomViewProps) => {
	const { bottom } = useSafeAreaInsets()

	const getPlatformBottom = () => {
		// if (Platform.OS === 'ios') {
		// 	return bottom
		// }
		return bottom + 8
	}

	return (
		<View
			style={[styles.container, { bottom: getPlatformBottom() }, style]}
			{...props}
		>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
		position: 'absolute',
		left: 0,
	},
})
