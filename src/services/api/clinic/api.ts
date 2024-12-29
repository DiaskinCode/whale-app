import {
	TClinicEntity,
	TListQueryDto,
	TListResponse,
	TQueryDto,
} from '@/src/types/api'
import { baseApi } from '../base'
import { TClinicCreateDto, TClinicUpdateDto } from './types'

class ClinicApi {
	private readonly path = '/clinic'

	async postAdminOne(args: TClinicCreateDto) {
		return baseApi.post(`${this.path}/admin`, args)
	}
	async patchAdminOne(id: string, args: TClinicUpdateDto) {
		return baseApi.patch(`${this.path}/admin/${id}`, args)
	}
	async removeAdminOne(id: string) {
		return baseApi.delete(`${this.path}/admin/${id}`)
	}
	async getOne(id: string, params: TQueryDto<TClinicEntity>) {
		return baseApi.get(`${this.path}/${id}`, { params })
	}
	async getAll(
		params: TListQueryDto<TClinicEntity>
	): Promise<TListResponse<TClinicEntity>> {
		return baseApi.get(this.path, { params })
	}
}

export const clinicApi = new ClinicApi()
