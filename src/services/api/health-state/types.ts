import { UserHealthStatesEnum } from '@/src/constants/api'

export type THealthStateUpdateDto = {
	date: Date
	state?: UserHealthStatesEnum
	content?: string
}
