import { sessionStore } from '@/src/stores/session'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { UserProfileInfoCardItem } from './UserProfileInfoCardItem'
import { accountApi } from '@/src/services/api/account'

export const UserProfileInfoCard = observer(() => {
	const { account } = sessionStore
	const { t } = useTranslation()

	const [hasActiveSubscription, setHasActiveSubscription] = useState<boolean | null>(null)
	const [subscriptionEndDate, setSubscriptionEndDate] = useState<string | null>(null)
	const [subscriptionDuration, setSubscriptionDuration] = useState<string | null>(null)

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

	const formatDate = (dateString:Date) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})
	}

	useEffect(() => {
		const fetchSubscriptionDetails = async () => {
			if (account?.email) {
				try {
					const response = await accountApi.getSubscriptionStatus(account.email);
	
					setHasActiveSubscription(response.subscription?.hasActiveSubscription || false);
	
					if (response.subscription?.subscriptionStartDate && response.subscription?.subscriptionEndDate) {
						const start = new Date(response.subscription.subscriptionStartDate);
						const end = new Date(response.subscription.subscriptionEndDate);
	
						// Get current date
						const currentDate = new Date();
	
						// Calculate the remaining days
						const remainingMs = end.getTime() - currentDate.getTime();
						const remainingDays = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
	
						console.log(response.subscription);
	
						// If there are remaining days
						if (remainingDays > 0) {
							setSubscriptionDuration(`${remainingDays} ${t('COMMON_DAYS')}`);
						} else {
							setSubscriptionDuration(t('SUBSCRIPTION_EXPIRED'));
						}
	
						setSubscriptionEndDate(formatDate(response.subscription.subscriptionEndDate));
					}
				} catch (error) {
					console.error('Failed to fetch subscription details:', error);
				}
			}
		};
		fetchSubscriptionDetails();
	}, [account?.email]);
	
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
			<View style={styles.card}>
				<View style={styles.header(hasActiveSubscription)}>
					<Text style={styles.headerText}>
						{hasActiveSubscription ? t('COMMON_SUBSCRIPTION_ACTIVE') : t('COMMON_SUBSCRIPTION_INACTIVE')}
					</Text>
				</View>
				<View style={styles.body}>
					{subscriptionDuration && (
						<Text style={styles.detail}>
							{`${t('SUBSCRIPTION_DURATION')}: ${subscriptionDuration}`}
						</Text>
					)}
					{subscriptionEndDate && (
						<Text style={styles.detail}>
							{`${t('SUBSCRIPTION_END_DATE')}: ${subscriptionEndDate}`}
						</Text>
					)}
				</View>
			</View>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	infoContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		paddingHorizontal: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		gap:5,
		paddingVertical: 20,
	},
	card: {
		overflow: 'hidden',
		width:'100%',
		borderRadius:10,
		backgroundColor: '#fff',
		marginTop:20
	},
	header: (hasActiveSubscription) => ({
		backgroundColor: hasActiveSubscription ? '#0ec241' : 'red',
		paddingHorizontal: 20,
		paddingVertical:10,
		borderTopEndRadius:10,
		borderTopStartRadius:10
	}),
	infoName: {
		fontSize: 17,
		fontWeight: '500',
		color: '#000',
	},
	headerText: {
		color: '#fff',
		fontWeight: '500',
		fontSize: 16,
	},
	body: {
		backgroundColor: '#fff',
		paddingHorizontal: 20,
		paddingVertical:10
	},
	detail: {
		fontSize: 14,
		color: '#333',
		marginVertical: 5,
	},
})
