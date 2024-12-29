import { ReactNode } from 'react'
import { StyleSheet, Text, TextProps, View, ViewProps } from 'react-native'
import { FieldError } from './FieldError'

interface FieldProps extends ViewProps {
	children?: ReactNode
	label?: string
	error?: string | null
}

export function Field({ children, style, label, error, ...props }: FieldProps) {
	return (
		<View style={[styles.container, style]} {...props}>
			{!!label && <FieldLabel>{label}</FieldLabel>}
			{children}
			{!!error && <FieldError>{error}</FieldError>}
		</View>
	)
}

export const FieldLabel = ({ children, style, ...props }: TextProps) => {
	return (
		<Text style={[styles.label, style]} {...props}>
			{children}
		</Text>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: 5,
	},
	label: {
		fontSize: 14,
		color: '#000',
		fontWeight: 'normal',
		textAlign: 'left',
		marginHorizontal: 8,
	},
})
