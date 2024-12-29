import {
	TListQueryDto,
	TListResponse,
	TMedicationPlanReceptionEntity,
	TQueryDto,
	TResponse,
} from '@/src/types/api'
import { baseApi } from '../base'
import { TMedicationPlanReceptionUpdateDto } from './types'

class MedicationPlanReceptionApi {
	private readonly path = '/medication-plan-reception'

	async patchUserOne(id: string, args: TMedicationPlanReceptionUpdateDto) {
		console.log(id, args)
		return baseApi.patch(`${this.path}/user/${id}`, args)
	}
	async getUserOne(
		id: string,
		params?: TQueryDto<TMedicationPlanReceptionEntity>
	): Promise<TResponse<TMedicationPlanReceptionEntity>> {
		return baseApi.get(`${this.path}/user/${id}`, { params })
	}
	async getUserAll(
		params: TListQueryDto<TMedicationPlanReceptionEntity>
	): Promise<TListResponse<TMedicationPlanReceptionEntity>> {
		return baseApi.get(`${this.path}/user`, { params })
	}
	async getUserClosest(): Promise<TResponse<TMedicationPlanReceptionEntity>> {
		return baseApi.get(`${this.path}/closest`)
	}
}

export const medicationPlanReceptionApi = new MedicationPlanReceptionApi()
