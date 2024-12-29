import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, ViewProps } from 'react-native'

interface LockMaskViewProps extends ViewProps {
	disabled: boolean
}

export const LockMaskView = ({
	children,
	style,
	disabled,
	...props
}: LockMaskViewProps) => {
	if (!disabled) return children

	return (
		<View style={styles.container}>
			{children}
			<View style={[styles.lock, style]} {...props}>
				<Ionicons name='lock-closed' size={24} color='#fff' />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},
	lock: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 10,
	},
})
