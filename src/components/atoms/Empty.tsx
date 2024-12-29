import { AntDesign } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'

interface EmptyProps {
	title?: string
}

export const Empty = ({ title }: EmptyProps) => {
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<AntDesign name='inbox' size={38} color='#ccc' />
			<Text style={styles.title}>{title ?? t('COMMON_EMPTY')}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 16,
		paddingVertical: 16,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
		color: '#ccc',
	},
})
