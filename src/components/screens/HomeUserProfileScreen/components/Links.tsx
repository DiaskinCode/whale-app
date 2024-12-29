import { CardLinkButton } from '@/src/components/atoms/CardLinkButton'
import { useTheme } from '@/src/hooks/useTheme'
import { AntDesign } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

export const Links = () => {
	const primaryColor = useTheme().primary
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<CardLinkButton
				variantColor='white'
				color='#000'
				hasArrow={false}
				icon={<AntDesign name='question' size={20} color={primaryColor} />}
				title={t('HOME_PROFILE_SUPPORT')}
				onPress={() =>
					WebBrowser.openBrowserAsync(
						'https://t.me/mergulya'
					)
				}
			/>
			<CardLinkButton
				variantColor='white'
				color='#000'
				hasArrow={false}
				icon={<AntDesign name='book' size={20} color={primaryColor} />}
				title={t('HOME_PROFILE_TERMS_OF_USE')}
				onPress={() =>
					WebBrowser.openBrowserAsync(
						'https://whalehealth.app/service-conditions/'
					)
				}
			/>
			<CardLinkButton
				variantColor='white'
				color='#000'
				hasArrow={false}
				icon={<AntDesign name='book' size={20} color={primaryColor} />}
				title={t('HOME_PROFILE_PRIVACY_POLICY')}
				onPress={() =>
					WebBrowser.openBrowserAsync('https://whalehealth.app/privacy-policy/')
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},
})
