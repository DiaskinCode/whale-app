import { useTheme } from '@/src/hooks/useTheme'
import { ComponentProps, ComponentRef, forwardRef } from 'react'
import { StyleProp, StyleSheet } from 'react-native'
import { BaseButton } from './BaseButton'

interface SelectButtonProps extends ComponentProps<typeof BaseButton> {
	style?: StyleProp<any>
	isActive: boolean
}

export const SelectButton = forwardRef<
	ComponentRef<typeof BaseButton>,
	SelectButtonProps
>(({ children, style, isActive, ...props }, ref) => {
	const primaryColor = useTheme().primary
	const secondaryColor = useTheme().secondary

	const getActiveStyle = (isActive: boolean) => {
		if (!isActive) {
			return {
				borderColor: secondaryColor,
			}
		}

		return {
			borderColor: primaryColor,
			shadowColor: primaryColor,
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowOpacity: 0.5,
			shadowRadius: 6,
			elevation: 8,
		}
	}

	return (
		<BaseButton
			ref={ref}
			style={[styles.container, getActiveStyle(isActive), style]}
			variantColor='white'
			{...props}
		>
			{children}
		</BaseButton>
	)
})

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		borderStyle: 'solid',
		borderWidth: 1,
	},
})
