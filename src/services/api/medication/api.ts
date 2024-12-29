import {
	TListQueryDto,
	TListResponse,
	TMedicationEntity,
	TQueryDto,
} from '@/src/types/api'
import { baseApi } from '../base'
import { TMedicationCreateDto, TMedicationUpdateDto } from './types'

class MedicationApi {
	private readonly path = '/medication'

	async postAdminOne(args: TMedicationCreateDto) {
		return baseApi.post(`${this.path}/admin`, args)
	}
	async patchAdminOne(id: string, args: TMedicationUpdateDto) {
		return baseApi.patch(`${this.path}/admin/${id}`, args)
	}
	async getOne(id: string, params: TQueryDto<TMedicationEntity>) {
		return baseApi.get(`${this.path}/${id}`, { params })
	}
	async getAll(
		params: TListQueryDto<TMedicationEntity>
	): Promise<TListResponse<TMedicationEntity>> {
		return baseApi.get(this.path, { params })
	}
}

export const medicationApi = new MedicationApi()
