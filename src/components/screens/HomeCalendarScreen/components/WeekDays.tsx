import { useTheme } from '@/src/hooks/useTheme'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'

export const WeekDays = () => {
	const primaryColor = useTheme().primary
	const { t } = useTranslation()
	// const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
	const weekDays = [
		t('COMMON_MON'),
		t('COMMON_TUE'),
		t('COMMON_WED'),
		t('COMMON_THU'),
		t('COMMON_FRI'),
		t('COMMON_SAT'),
		t('COMMON_SUN'),
	]

	return (
		<View style={styles.container}>
			{weekDays.map((dayOfWeek, index) => (
				<View key={index} style={styles.item}>
					<Text style={[styles.text, { color: primaryColor }]}>
						{dayOfWeek}
					</Text>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: '#fff',
	},
	item: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 14,
		fontWeight: '600',
	},
})
