import { View, ViewProps } from 'react-native'

type BottomSpaceVariantSize = 'md' | 'sm'
interface BottomSpaceProps extends ViewProps {
	variantSize?: BottomSpaceVariantSize
}

export const BottomSpace = ({
	style,
	variantSize = 'md',
	...props
}: BottomSpaceProps) => {
	const height = variantSize === 'md' ? 60 : 50

	const getPlatformHeight = () => {
		// if (Platform.OS === 'ios') {
		// 	return height
		// }
		return height + 8
	}

	return <View style={[{ height: getPlatformHeight() }, style]} {...props} />
}
