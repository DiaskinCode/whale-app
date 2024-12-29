import { Platform, StyleSheet, View, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface BottomSheetViewProps extends ViewProps {}

export const BottomSheetView = ({
	children,
	style,
	...props
}: BottomSheetViewProps) => {
	const { bottom } = useSafeAreaInsets()

	const getPlatformStyle = () => {
		if (Platform.OS === 'ios') {
			return {
				paddingBottom: bottom,
			}
		}
		return {
			paddingBottom: bottom + 8,
		}
	}

	return (
		<View style={[styles.container, style, getPlatformStyle()]} {...props}>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
})
