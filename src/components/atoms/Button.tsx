import { useTheme } from '@/src/hooks/useTheme'
import { ComponentProps, ComponentRef, forwardRef, ReactNode } from 'react'
import { StyleProp, StyleSheet, Text } from 'react-native'
import { BaseButton, BaseButtonVariantColor } from './BaseButton'

type ButtonVariantSize = 'md' | 'sm'
interface ButtonProps extends ComponentProps<typeof BaseButton> {
	children: ReactNode
	variantSize?: ButtonVariantSize
	style?: StyleProp<any>
}

export const Button = forwardRef<ComponentRef<typeof BaseButton>, ButtonProps>(
	(
		{
			children,
			style,
			variantSize = 'md',
			variantStyle = 'solid',
			variantColor = 'primary',
			...props
		},
		ref
	) => {
		const primaryColor = useTheme().primary
		const blackColor = useTheme().black
		const redColor = useTheme().red
		const greenColor = useTheme().green

		const getVariantSizeStyles = (variantSize: ButtonVariantSize) => {
			switch (variantSize) {
				case 'md':
					return styles.variantSizeMd
				case 'sm':
					return styles.variantSizeSm
			}
		}

		const getVariantSizeTextStyles = (variantSize: ButtonVariantSize) => {
			switch (variantSize) {
				case 'md':
					return styles.variantSizeMdText
				case 'sm':
					return styles.variantSizeSmText
			}
		}

		const getVariantColorStyles = (variantColor: BaseButtonVariantColor) => {
			if (variantStyle === 'solid') {
				return [{ color: '#fff' }]
			} else {
				switch (variantColor) {
					case 'primary':
						return [{ color: primaryColor }]
					case 'black':
						return [{ color: blackColor }]
					case 'white':
						return [{ color: '#fff' }]
					case 'red':
						return [{ color: redColor }]
					case 'green':
						return [{ color: greenColor }]
					case 'orange':
						return [{ color: '#F47D31' }]
				}
			}
		}

		return (
			<BaseButton
				ref={ref}
				style={[getVariantSizeStyles(variantSize), styles.button, style]}
				variantStyle={variantStyle}
				variantColor={variantColor}
				{...props}
			>
				{typeof children === 'string' ? (
					<Text
						style={[
							getVariantSizeTextStyles(variantSize),
							getVariantColorStyles(variantColor),
							// { color: variantStyle === 'solid' ? '#fff' : '#000' },
						]}
					>
						{children}
					</Text>
				) : (
					children
				)}
			</BaseButton>
		)
	}
)

const styles = StyleSheet.create({
	button: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		borderRadius: 10,
	},
	text: {},
	variantSizeMd: {
		height: 55,
	},
	variantSizeMdText: {
		fontSize: 16,
		fontWeight: '600',
	},
	variantSizeSm: {
		height: 50,
	},
	variantSizeSmText: {
		fontSize: 16,
		fontWeight: '600',
	},
})
