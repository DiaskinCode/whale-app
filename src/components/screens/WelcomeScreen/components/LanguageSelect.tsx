import { Dropdown } from '@/src/components/atoms/DropDown'
import { LangsData } from '@/src/constants/langs'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'

interface LanguageSelectProps {
	hasTitle?: boolean
}

export const LanguageSelect = ({ hasTitle = true }: LanguageSelectProps) => {
	const { t, i18n } = useTranslation()
	console.log(i18n.language)

	const handleSelect = (item: any) => {
		i18n.changeLanguage(item.value)
	}

	return (
		<View style={styles.container}>
			{hasTitle && (
				<Text style={styles.title}>{`${t('COMMON_SELECT_LANGUAGE')}:`}</Text>
			)}
			<Dropdown
				labelField='label'
				valueField='value'
				data={LangsData}
				value={i18n.language}
				onChange={handleSelect}
			/>
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
		fontSize: 16,
		fontWeight: '500',
		color: '#fff',
	},
})
