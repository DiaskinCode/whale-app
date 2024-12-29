import { MedicationShapesEnum, MedicationTypesEnum } from '@/src/constants/api'
import { TMedicationEntity } from '@/src/types/api'

export type TMedicationCreateDto = {
	type: MedicationTypesEnum
	title: string
	shape: MedicationShapesEnum
}

export type TMedicationUpdateDto = Partial<TMedicationEntity>
