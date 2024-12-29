import { TPurposeEntity } from '@/src/types/api'

export type TPurposeCreateDto = {
	title: string
	fileId: string
}

export type TPurposeUpdateDto = Partial<TPurposeEntity>
