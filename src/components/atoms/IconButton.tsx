import { ComponentProps, ComponentRef, forwardRef, ReactNode } from 'react'
import { StyleProp, StyleSheet } from 'react-native'
import { BaseButton } from './BaseButton'

interface IconButtonProps extends ComponentProps<typeof BaseButton> {
	children: ReactNode
	style?: StyleProp<any>
}

export const IconButton = forwardRef<
	ComponentRef<typeof BaseButton>,
	IconButtonProps
>(({ children, style, ...props }, ref) => {
	return (
		<BaseButton
			ref={ref}
			style={[styles.iconButton, style]}
			variantColor='white'
			{...props}
		>
			{children}
		</BaseButton>
	)
})

const styles = StyleSheet.create({
	iconButton: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
		borderRadius: 10,
	},
})
