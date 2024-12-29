import { createEvent, createStore } from 'effector'

export const setIsHomeTabVisible = createEvent<boolean>()

export const $isHomeTabVisible = createStore<boolean>(true).on(
	setIsHomeTabVisible,
	(_, isVisible) => isVisible
)
