import { ComponentRef, forwardRef } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface TouchableButtonProps extends TouchableOpacityProps {}

export const TouchableButton = forwardRef<
	ComponentRef<typeof TouchableOpacity>,
	TouchableButtonProps
>(({ style, ...props }, ref) => {
	const getStyle = () => {
		if (props.disabled) return [{ opacity: 0.5 }]
	}

	return <TouchableOpacity style={[getStyle(), style]} {...props} />
})
