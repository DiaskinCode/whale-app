import { Button } from '@/src/components/atoms/Button'
import { ComponentProps } from 'react'
import { StyleSheet, Text } from 'react-native'

interface OAuthButtonProps
	extends Omit<ComponentProps<typeof Button>, 'children'> {
	icon: React.ReactNode
	children: string
}

export const OAuthButton = ({
	style,
	children,
	icon,
	...props
}: OAuthButtonProps) => {
	return (
		<Button style={[styles.oauthButton, style]} {...props}>
			{icon}
			<Text style={styles.text}>{children}</Text>
		</Button>
	)
}

const styles = StyleSheet.create({
	oauthButton: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
	},
	text: {
		fontSize: 14,
		fontWeight: '600',
		color: '#fff',
	},
})
