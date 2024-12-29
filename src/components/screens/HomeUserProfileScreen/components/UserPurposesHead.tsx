import { IconButton } from '@/src/components/atoms/IconButton'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { AntDesign } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'

export const UserPurposesHead = () => {
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{t('HOME_PROFILE_PURPOSES')}</Text>
			<IconButton
				style={styles.edit}
				variantColor='green'
				onPress={() => navigation.push('PurposeList')}
			>
				<AntDesign name='edit' size={14} color='#fff' />
			</IconButton>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
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
