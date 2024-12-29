import { createEvent, createStore } from 'effector'

export const setMedicationPlanReceptionNotification = createEvent<
	string | null
>()

export const $medicationPlanReceptionNotification = createStore<string | null>(
	null
)
