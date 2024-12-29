import {
	TListQueryDto,
	TListResponse,
	TMedicationPlanEntity,
	TQueryDto,
	TResponse,
} from '@/src/types/api'
import { baseApi } from '../base'
import { TMedicationPlanCreateDto, TMedicationPlanUpdateDto } from './types'

class MedicationPlanApi {
	private readonly path = '/medication-plan'

	async postUserOne(args: TMedicationPlanCreateDto) {
		return baseApi.post(`${this.path}/user`, args)
	}
	async patchUserOne(id: string, args: TMedicationPlanUpdateDto) {
		return baseApi.patch(`${this.path}/user/${id}`, args)
	}
	async removeUserOne(id: string) {
		return baseApi.delete(`${this.path}/user/${id}`)
	}
	async getUserOne(
		id: string,
		params: TQueryDto<TMedicationPlanEntity>
	): Promise<TResponse<TMedicationPlanEntity>> {
		return baseApi.get(`${this.path}/user/${id}`, { params })
	}
	async getUserAll(
		params: TListQueryDto<TMedicationPlanEntity>
	): Promise<TListResponse<TMedicationPlanEntity>> {
		return baseApi.get(`${this.path}/user`, { params })
	}
}

export const medicationPlanApi = new MedicationPlanApi()
