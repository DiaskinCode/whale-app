import { TClinicEntity } from '@/src/types/api'

export type TClinicCreateDto = {
	title: string
}

export type TClinicUpdateDto = Partial<TClinicEntity>
