import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { IntroCard } from './IntroCard'

export const IntroCardList = () => {
	const { t } = useTranslation()

	const introCards = useMemo(() => {
		return [
			{
				image: require('@/assets/images/intro-card-1.png'),
				title: t('WELCOME_CARD_TITLE_1'),
				description: t('WELCOME_CARD_DESCRIPTION_1'),
			},
			{
				image: require('@/assets/images/intro-card-2.png'),
				title: t('WELCOME_CARD_TITLE_2'),
				description: t('WELCOME_CARD_DESCRIPTION_2'),
			},
			{
				image: require('@/assets/images/intro-card-3.png'),
				title: t('WELCOME_CARD_TITLE_3'),
				description: t('WELCOME_CARD_DESCRIPTION_3'),
			},
		]
	}, [t])

	return (
		<View style={styles.container}>
			{introCards.map(({ image, title, description }) => (
				<IntroCard
					key={title}
					image={image}
					title={title}
					description={description}
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
		marginTop: 10,
	},
})
