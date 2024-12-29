import { StyleSheet, View } from 'react-native'
import { UserPurposesHead } from './UserPurposesHead'
import { UserPurposesList } from './UserPurposesList'

export const UserPurposes = () => {
	return (
		<View style={styles.container}>
			<UserPurposesHead />
			<UserPurposesList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		paddingVertical: 20,
		paddingHorizontal: 13,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	head: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000',
	},
	edit: {
		width: 25,
		height: 25,
		borderRadius: 25,
	},
})
