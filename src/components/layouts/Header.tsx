import { StyleSheet, View, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface HeaderProps extends Omit<ViewProps, 'children'> {
	left?: React.ReactNode
	center?: React.ReactNode
	right?: React.ReactNode
}

export const Header = ({
	left,
	center,
	right,
	style,
	...props
}: HeaderProps) => {
	const { top } = useSafeAreaInsets()

	return (
		<View style={[{ paddingTop: top }, styles.header, style]} {...props}>
			<View style={styles.content}>
				<View style={styles.left}>{left}</View>
				<View style={styles.center}>{center}</View>
				<View style={styles.right}>{right}</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		width: '100%',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: 60,
		paddingHorizontal: 16,

		backgroundColor: '#fff',
	},
	left: {
		width: 40,
	},
	center: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	right: {
		width: 40,
	},
})
