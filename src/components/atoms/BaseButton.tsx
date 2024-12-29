import { useTheme } from '@/src/hooks/useTheme'
import { ComponentProps, ComponentRef, forwardRef, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

export type BaseButtonVariantColor =
	| 'primary'
	| 'black'
	| 'white'
	| 'red'
	| 'green'
	| 'orange'
export type BaseButtonVariantStyle = 'solid' | 'outline'
interface BaseButtonProps extends ComponentProps<typeof Pressable> {
	variantColor?: BaseButtonVariantColor
	variantStyle?: BaseButtonVariantStyle
}

export const BaseButton = forwardRef<
	ComponentRef<typeof Pressable>,
	BaseButtonProps
>(
	(
		{
			children,
			style,
			variantColor = 'primary',
			variantStyle = 'solid',
			...props
		},
		ref
	) => {
		const [isHover, setIsHover] = useState<boolean>(false)
		const primaryColor = useTheme().primary
		const blackColor = useTheme().black
		const redColor = useTheme().red
		const greenColor = useTheme().green

		const getVariantColorStyles = (variantColor: BaseButtonVariantColor) => {
			if (props.disabled) return [{ backgroundColor: '#a0a0a0', opacity: 0.5 }]
			if (variantStyle === 'solid') {
				switch (variantColor) {
					case 'primary':
						return [{ backgroundColor: primaryColor }]
					case 'black':
						return [{ backgroundColor: blackColor }]
					case 'white':
						return [{ backgroundColor: '#fff' }]
					case 'red':
						return [{ backgroundColor: redColor }]
					case 'green':
						return [{ backgroundColor: greenColor }]
					case 'orange':
						return [{ backgroundColor: '#F47D31' }]
				}
			} else {
				switch (variantColor) {
					case 'primary':
						return [{ borderColor: primaryColor, borderWidth: 1 }]
					case 'black':
						return [{ borderColor: blackColor, borderWidth: 1 }]
					case 'white':
						return [{ borderColor: '#fff', borderWidth: 1 }]
					case 'red':
						return [{ borderColor: redColor, borderWidth: 1 }]
					case 'green':
						return [{ borderColor: greenColor, borderWidth: 1 }]
					case 'orange':
						return [{ borderColor: '#F47D31', borderWidth: 1 }]
				}
			}
		}

		const getVariantHoverStyles = (variantColor: BaseButtonVariantColor) => {
			if (!isHover) return []
			if (variantStyle === 'solid') {
				switch (variantColor) {
					case 'primary':
						return [{ backgroundColor: '#4C55D4' }]
					case 'black':
						return [{ backgroundColor: '#181818' }]
					case 'white':
						return [{ backgroundColor: '#f5f5f4' }]
					case 'red':
						return [{ backgroundColor: '#D73737' }]
					case 'green':
						return [{ backgroundColor: '#28A93D' }]
					case 'orange':
						return [{ backgroundColor: '#D86926' }]
				}
			} else {
				return [{ backgroundColor: '#f5f5f4' }]
			}
		}

		return (
			<Pressable
				ref={ref}
				style={[
					...getVariantColorStyles(variantColor),
					...getVariantHoverStyles(variantColor),
					styles.baseButton,
					style,
				]}
				onPressIn={() => setIsHover(true)}
				onPressOut={() => setIsHover(false)}
				{...props}
			>
				{children}
			</Pressable>
		)
	}
)

const styles = StyleSheet.create({
	baseButton: {},
})
