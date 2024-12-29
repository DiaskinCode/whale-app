import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'

export const UserProfileInfoHead = () => {
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{t('HOME_PROFILE_SUBTITLE')}</Text>
			<Text style={styles.description}>{t('HOME_PROFILE_DESCRIPTION')}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 5,
	},
	title: {
		fontSize: 20,
		fontWeight: '600',
		color: '#000',
	},
	description: {
		fontSize: 14,
		fontWeight: '600',
		color: '#aaa',
	},
})
