import { StyleSheet, Text, View, ViewProps } from 'react-native'

export interface FieldErrorProps extends ViewProps {}

export function FieldError({ children, style, ...props }: FieldErrorProps) {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, style]} {...props}>
				{children}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 8,
	},
	text: {
		fontSize: 12,
		color: '#ff0000',
		fontWeight: 'normal',
		textAlign: 'left',
	},
})
