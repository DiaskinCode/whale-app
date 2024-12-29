import { ReactNode } from 'react'
import { StyleSheet, Text, View, ViewProps } from 'react-native'

interface ModalProps extends ViewProps {
	header?: ReactNode
	footer?: ReactNode
}

export const Modal = ({
	children,
	style,
	header,
	footer,
	...props
}: ModalProps) => {
	return (
		<View style={[styles.container, style]} {...props}>
			{header}
			{children}
			{footer}
		</View>
	)
}

export const ModalHeader = ({
	children,
	style,
	title,
	...props
}: ViewProps & { title?: ReactNode }) => {
	return (
		<View style={[styles.header, style]} {...props}>
			{title && <Text style={styles.title}>{title}</Text>}
			{children}
		</View>
	)
}

export const ModalFooter = ({ children, style, ...props }: ViewProps) => {
	return (
		<View style={[styles.footer, style]} {...props}>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20,
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000',
	},
	footer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		gap: 10,
	},
})
