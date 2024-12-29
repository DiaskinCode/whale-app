import { ReactNode, forwardRef, useState } from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'

import { useTheme } from '@/src/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { TouchableButton } from './TouchableButton'

export interface InputProps extends TextInputProps {
	name?: string
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	as?: React.ElementType
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
	{ style, secureTextEntry = false, leftIcon, rightIcon, as, ...props },
	ref
) {
	const [showPassword, setShowPassword] = useState<boolean>(
		secureTextEntry ? false : true
	)
	const primaryColor = useTheme().primary
	const secondaryColor = useTheme().secondary

	const Component = as ?? View

	return (
		<Component style={styles.container}>
			<TextInput
				ref={ref}
				style={[
					{
						borderColor: secondaryColor,
						paddingRight: rightIcon ? 44 : undefined,
						paddingLeft: leftIcon ? 44 : undefined,
					},
					styles.input,
					style,
				]}
				placeholderTextColor='#555555'
				secureTextEntry={!showPassword}
				numberOfLines={1}
				clearTextOnFocus={false}
				{...props}
			/>
			{leftIcon && <View style={[styles.icon, { left: 2 }]}>{leftIcon}</View>}
			{(rightIcon || secureTextEntry) && (
				<View style={[styles.icon, { right: 2 }]}>
					{!rightIcon ? (
						<>
							{!!secureTextEntry && (
								<TouchableButton
									style={styles.icon}
									activeOpacity={0.5}
									onPress={() => setShowPassword(prev => !prev)}
								>
									<Ionicons
										name={showPassword ? 'eye-off-outline' : 'eye-outline'}
										size={20}
										color={primaryColor}
									/>
								</TouchableButton>
							)}
						</>
					) : (
						<>{rightIcon}</>
					)}
				</View>
			)}
		</Component>
	)
})

const styles = StyleSheet.create({
	container: {
		width: '100%',
		position: 'relative',
	},
	input: {
		width: '100%',
		height: 50,
		marginBottom: 0,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: '#fff',
		fontSize: 16,
	},
	icon: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: '100%',
		position: 'absolute',
		bottom: 0,
	},
	password: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
