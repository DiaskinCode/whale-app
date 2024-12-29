import { StyleSheet, View, ViewProps } from 'react-native'

interface FieldGroupProps extends ViewProps {}

export const FieldGroup = ({ children, style, ...props }: FieldGroupProps) => {
	return (
		<View style={[styles.container, style]} {...props}>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		gap: 16,
	},
})
