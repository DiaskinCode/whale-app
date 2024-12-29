import {
	TConsultEntity,
	TListQueryDto,
	TListResponse,
	TQueryDto,
	TResponse,
} from '@/src/types/api'
import { baseApi } from '../base'
import { TConsultCreateDto } from './types'

class ConsultApi {
	private readonly path = '/consult'

	async postUserOne(args: TConsultCreateDto) {
		return baseApi.post(`${this.path}/user`, args)
	}
	async patchUserOne(id: string, args: TConsultCreateDto) {
		return baseApi.patch(`${this.path}/user/${id}`, args)
	}
	async deleteUserOne(id: string) {
		return baseApi.delete(`${this.path}/user/${id}`)
	}
	async getUserOne(
		id: string,
		params?: TQueryDto<TConsultEntity>
	): Promise<TResponse<TConsultEntity>> {
		return baseApi.get(`${this.path}/user/${id}`, { params })
	}
	async getUserAll(
		params: TListQueryDto<TConsultEntity>
	): Promise<TListResponse<TConsultEntity>> {
		return baseApi.get(`${this.path}/user`, { params })
	}
}

export const consultApi = new ConsultApi()
