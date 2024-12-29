import { CardLinkButton } from '@/src/components/atoms/CardLinkButton'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useTheme } from '@/src/hooks/useTheme'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

export const Navigation = () => {
	const primaryColor = useTheme().primary
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	const navigationList = useMemo(() => {
		return [
			{
				title: t('HOME_PROFILE_PURPOSES'),
				icon: <Ionicons name='heart-outline' size={20} color={primaryColor} />,
				route: () => navigation.push('PurposeList'),
			},
			{
				title: t('HOME_PROFILE_EDIT_PROFILE'),
				icon: <AntDesign name='user' size={20} color={primaryColor} />,
				route: () => navigation.push('EditUserProfile'),
			},
			{
				title: t('HOME_PROFILE_MEDICATIONS'),
				icon: <AntDesign name='medicinebox' size={20} color={primaryColor} />,
				route: () => navigation.push('UserMedicationList'),
			},
			{
				title: t('HOME_PROFILE_MONITORING'),
				icon: <Ionicons name='bar-chart-outline' size={20} color={primaryColor} />,
				route: () => navigation.push('Monitoring'),
			},
			{
				title: t('HOME_PROFILE_SUBSCRIPTION'),
				icon: <Ionicons name='wallet-outline' size={20} color={primaryColor} />,
				route: () => navigation.push('Subscription'),
			},
			{
				title: t('HOME_PROFILE_SUBSCRIPTION'),
				icon: <Ionicons name='wallet-outline' size={20} color={primaryColor} />,
				route: () => navigation.push('Subscription'),
			},
		]
	}, [primaryColor, t])

	return (
		<View style={styles.container}>
			{navigationList.map((item, index) => (
				<CardLinkButton
					key={index}
					variantColor='white'
					color='#000'
					icon={item.icon}
					title={item.title}
					onPress={item.route}
				/>
			))}
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
