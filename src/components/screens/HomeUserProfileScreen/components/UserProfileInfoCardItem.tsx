import { StyleSheet, Text, View } from 'react-native'

interface UserProfileInfoCardItemProps {
	title: string
	description: string
}

export const UserProfileInfoCardItem = ({
	title,
	description,
}: UserProfileInfoCardItemProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.item}>{title}</Text>
			<Text style={styles.item}>{description}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
	},
	item: {
		fontSize: 14,
		fontWeight: '300',
		color: '#000',
	},
})
