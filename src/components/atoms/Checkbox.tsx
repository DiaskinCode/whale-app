import { useTheme } from '@/src/hooks/useTheme'
import {
	Checkbox as NativeCheckbox,
	CheckboxProps as NativeCheckboxProps,
} from 'expo-checkbox'
import { ComponentRef, forwardRef } from 'react'

interface CheckboxProps extends NativeCheckboxProps {
	hasText?: boolean
}

export const Checkbox = forwardRef<
	ComponentRef<typeof NativeCheckbox>,
	CheckboxProps
>(({ style, ...props }, ref) => {
	const primaryColor = useTheme().primary

	return (
		<NativeCheckbox
			style={[{ borderRadius: 10 }, style]}
			color={primaryColor}
			{...props}
		/>
	)
})
