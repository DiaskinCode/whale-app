import { Avatar } from '@/src/components/atoms/Avatar'
import { sessionStore } from '@/src/stores/session'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { UserProfileInfoCardItem } from './UserProfileInfoCardItem'

export const UserProfileInfoCard = observer(() => {
	const { account } = sessionStore
	const { t } = useTranslation()

	const getFullName = () => {
		if (account?.fullName) return account?.fullName
		if (account?.email) return account?.email
		if (account?.phone) return account?.phone
		return t('COMMON_NOT_DEFINED')
	}

	const getGender = () => {
		if (account?.userGender) return `${account?.userGender}`
		return t('COMMON_NOT_DEFINED')
	}

	const getAge = () => {
		if (account?.userAge) return `${account?.userAge}`
		return t('COMMON_NOT_DEFINED')
	}

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<Text style={styles.infoName}>{getFullName()}</Text>
				<UserProfileInfoCardItem
					title={`${t('COMMON_GENDER')}:`}
					description={getGender()}
				/>
				<UserProfileInfoCardItem
					title={`${t('COMMON_AGE')}:`}
					description={getAge()}
				/>
			</View>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 36,
		paddingVertical: 20,
		paddingHorizontal: 13,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	avatar: {
		width: 80,
		height: 80,
		resizeMode: 'contain',
		borderRadius: 80,
	},
	infoContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 5,
	},
	infoName: {
		fontSize: 16,
		fontWeight: '500',
		color: '#000',
	},
})
