import { Ionicons } from '@expo/vector-icons'
import { ComponentProps, ReactNode } from 'react'
import { StyleProp, StyleSheet, Text, View } from 'react-native'
import { BaseButton } from './BaseButton'

interface CardLinkButtonProps extends ComponentProps<typeof BaseButton> {
	style?: StyleProp<any>
	icon?: ReactNode
	title: ReactNode
	color?: string
	hasArrow?: boolean
}

export const CardLinkButton = ({
	style,
	icon,
	title,
	color = '#fff',
	hasArrow = true,
	...props
}: CardLinkButtonProps) => {
	return (
		<BaseButton style={[styles.container, style]} {...props}>
			<View style={styles.content}>
				{icon && <View style={{ marginRight: 10 }}>{icon}</View>}
				{typeof title === 'string' ? (
					<Text style={[styles.title, { color }]}>{title}</Text>
				) : (
					title
				)}
			</View>
			{hasArrow && <Ionicons name='chevron-forward' size={18} color={color} />}
		</BaseButton>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 18,
		paddingVertical: 15,
		borderRadius: 10,
	},
	content: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},
	title: {
		fontSize: 14,
		fontWeight: '400',
	},
})
