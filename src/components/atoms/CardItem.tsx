import { ReactNode } from 'react'
import { StyleSheet, Text, TextProps, View, ViewProps } from 'react-native'

interface CardItemProps extends Omit<ViewProps, 'children'> {
	title: ReactNode
	description: ReactNode
}

export const CardItem = ({
	title,
	description,
	style,
	...props
}: CardItemProps) => {
	return (
		<View style={[styles.container, style]} {...props}>
			{title}
			{description}
		</View>
	)
}

export const CardItemTitle = ({ children, style, ...props }: TextProps) => {
	return (
		<Text style={[styles.title, style]} {...props}>
			{children}
		</Text>
	)
}

export const CardItemDescription = ({
	children,
	style,
	...props
}: TextProps) => {
	return (
		<Text style={[styles.description, style]} {...props}>
			{children}
		</Text>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 14,
		fontWeight: '600',
		color: '#333',
	},
	description: {
		fontSize: 14,
		fontWeight: '400',
		color: '#333',
	},
})
