import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect, useRef, useState } from 'react'
import { Linking, Platform } from 'react-native'
import { MedicationReceptionStatusEnum } from '../constants/api'
import { TAccountModel } from '../models/api'
import { deviceApi } from '../services/api/device'
import { medicationPlanReceptionApi } from '../services/api/medication-plan-reception'
import { setMedicationPlanReceptionNotification } from '../stores/notification'

const MEDICATION_PLAN_RECEPTION_ACTIONS = {
	accept: {
		identifier: 'accept',
		buttonTitle: 'Принять',
	} as Notifications.NotificationAction,
	postpone: {
		identifier: 'postpone',
		buttonTitle: 'Отложить на 5 минут',
	} as Notifications.NotificationAction,
	cancel: {
		identifier: 'cancel',
		buttonTitle: 'Отменить',
	} as Notifications.NotificationAction,
}
Notifications.setNotificationCategoryAsync('medicationPlanReception', [
	MEDICATION_PLAN_RECEPTION_ACTIONS.accept,
	MEDICATION_PLAN_RECEPTION_ACTIONS.postpone,
	MEDICATION_PLAN_RECEPTION_ACTIONS.cancel,
])
Notifications.setNotificationCategoryAsync('medicationPlanReceptionPostpone', [
	MEDICATION_PLAN_RECEPTION_ACTIONS.accept,
	MEDICATION_PLAN_RECEPTION_ACTIONS.cancel,
])

export const useNotifications = (account: TAccountModel | null) => {
	const [medicationPlanReceptionId, setMedicationPlanReceptionId] = useState<
		string | null
	>(null)
	const notificationListener = useRef<Notifications.Subscription>()
	const responseListener = useRef<Notifications.Subscription>()

	const registerForNotifications = async () => {
		try {
			const token = await registerForPushNotificationsAsync()
			if (!token) return
			await deviceApi.postOne({ deviceId: token })
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!account?.userIsNotificationEnabled) return

		registerForNotifications()

		notificationListener.current =
			Notifications.addNotificationReceivedListener(notification => {
				console.log(notification)
			})

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(async response => {
				try {
					console.log(response)
					if (
						response.actionIdentifier ===
						MEDICATION_PLAN_RECEPTION_ACTIONS.accept.identifier
					) {
						await medicationPlanReceptionApi.patchUserOne(
							response.notification.request.content.data.receptionId,
							{
								status: MedicationReceptionStatusEnum.Completed,
							}
						)
						await Notifications.dismissNotificationAsync(
							response.notification.request.identifier
						)
						return
					} else if (
						response.actionIdentifier ===
						MEDICATION_PLAN_RECEPTION_ACTIONS.postpone.identifier
					) {
						await medicationPlanReceptionApi.patchUserOne(
							response.notification.request.content.data.receptionId,
							{
								status: MedicationReceptionStatusEnum.Skipped,
							}
						)
						Notifications.scheduleNotificationAsync({
							content: {
								data: {
									receptionId:
										response.notification.request.content.data.receptionId,
									url: response.notification.request.content.data.url,
								},
								title: 'Whale.App',
								body: 'Препарат отложен на 5 минут',
								sound: true,
								categoryIdentifier: 'medicationPlanReceptionPostpone',
							},
							trigger: { seconds: 1 * 60 },
						})
						await Notifications.dismissNotificationAsync(
							response.notification.request.identifier
						)
						return
					} else if (
						response.actionIdentifier ===
						MEDICATION_PLAN_RECEPTION_ACTIONS.cancel.identifier
					) {
						await medicationPlanReceptionApi.patchUserOne(
							response.notification.request.content.data.receptionId,
							{
								status: MedicationReceptionStatusEnum.Declined,
							}
						)
						await Notifications.dismissNotificationAsync(
							response.notification.request.identifier
						)
						return
					} else {
						await Linking.openURL(
							response.notification.request.content.data.url
						)
						console.log(response.notification.request.content.data.receptionId)
						setMedicationPlanReceptionId(
							response.notification.request.content.data.receptionId
						)
						// await Notifications.scheduleNotificationAsync({
						// 	content: {
						// 		title: response.notification.request.content.title,
						// 		subtitle: response.notification.request.content.subtitle,
						// 		body: response.notification.request.content.body,
						// 		data: response.notification.request.content.data,
						// 		categoryIdentifier: 'medicationPlanReception',
						// 	},
						// 	trigger: null,
						// })
					}
				} catch (error) {
					console.log(error)
				}
			})

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(
					notificationListener.current
				)
			responseListener.current &&
				Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, [account])

	useEffect(() => {
		setMedicationPlanReceptionNotification(medicationPlanReceptionId)
	}, [medicationPlanReceptionId])
}

export async function registerForPushNotificationsAsync() {
	try {
		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
			})
		}

		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync()
			let finalStatus = existingStatus
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync()
				finalStatus = status
			}
			if (finalStatus !== 'granted') {
				throw new Error(
					'Permission not granted to get push token for push notification!'
				)
			}
			const projectId =
				Constants?.expoConfig?.extra?.eas?.projectId ??
				Constants?.easConfig?.projectId
			if (!projectId) {
				throw new Error('Project ID not found')
			}

			const pushTokenString = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			).data

			return pushTokenString
		} else {
			throw new Error('Must use physical device for push notifications')
		}
	} catch (error) {
		console.log(error)
	}
}
