import { useTheme } from '@/src/hooks/useTheme'
import { StyleSheet, View, ViewProps } from 'react-native'

interface LineProps extends ViewProps {}

export const Line = ({ style, ...props }: LineProps) => {
	const secondaryColor = useTheme().secondary

	return (
		<View
			style={[{ backgroundColor: secondaryColor }, styles.line, style]}
			{...props}
		/>
	)
}

const styles = StyleSheet.create({
	line: {
		width: '100%',
		height: 1,
	},
})
