import { StyleSheet, Text, View } from 'react-native'

interface ConsultCardItemProps {
	title: string
	description: string
}

export const ConsultCardItem = ({
	title,
	description,
}: ConsultCardItemProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 14,
		fontWeight: '600',
		color: '#333',
	},
	description: {
		fontSize: 14,
		fontWeight: '400',
		color: '#333',
	},
})
