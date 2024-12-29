import { StyleSheet, View } from 'react-native'
import { UserProfileInfoCard } from './UserProfileInfoCard'
import { UserProfileInfoHead } from './UserProfileInfoHead'

export const UserProfileInfo = () => {
	return (
		<View style={styles.container}>
			<UserProfileInfoHead />
			<UserProfileInfoCard />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
