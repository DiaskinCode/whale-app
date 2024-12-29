import { TListQueryDto, TListResponse, TPurposeEntity } from '@/src/types/api'
import { baseApi } from '../base'
import { TPurposeCreateDto, TPurposeUpdateDto } from './types'

class PurposeApi {
	private readonly path = '/purpose'

	async postAdminOne(args: TPurposeCreateDto) {
		return baseApi.post(`${this.path}/admin`, args)
	}
	async patchAdminOne(id: string, args: TPurposeUpdateDto) {
		return baseApi.patch(`${this.path}/admin/${id}`, args)
	}
	async deleteAdminOne(id: string) {
		return baseApi.delete(`${this.path}/admin/${id}`)
	}
	async getAdminAll(
		params: TListQueryDto<TPurposeEntity>
	): Promise<TListResponse<TPurposeEntity>> {
		return baseApi.get(`${this.path}/admin`, { params })
	}
	async getUserAll(
		params: TListQueryDto<TPurposeEntity>
	): Promise<TListResponse<TPurposeEntity>> {
		return baseApi.get(`${this.path}/user`, { params })
	}
	async getPublicAll(
		params: TListQueryDto<TPurposeEntity>
	): Promise<TListResponse<TPurposeEntity>> {
		return baseApi.get(`${this.path}/public`, { params })
	}
}

export const purposeApi = new PurposeApi()
