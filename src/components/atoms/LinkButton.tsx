import { ComponentProps, ComponentRef, forwardRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableButton } from './TouchableButton'

interface LinkButtonProps extends ComponentProps<typeof TouchableButton> {
	textStyle?: ComponentProps<typeof Text>['style']
	color: string
}

export const LinkButton = forwardRef<
	ComponentRef<typeof TouchableButton>,
	LinkButtonProps
>(({ children, style, textStyle, color, ...props }, ref) => {
	return (
		<TouchableButton ref={ref} style={[styles.link, style]} {...props}>
			<View style={[styles.content, { borderBottomColor: color }]}>
				<Text style={[{ color }, styles.text, textStyle]}>{children}</Text>
			</View>
		</TouchableButton>
	)
})

const styles = StyleSheet.create({
	link: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	content: {
		flex: 0,
		borderStyle: 'solid',
		borderBottomWidth: 1,
	},
	text: {
		fontSize: 14,
		fontWeight: '600',
	},
})
