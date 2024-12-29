import {
	THealthStateEntity,
	TListQueryDto,
	TListResponse,
	TQueryDto,
} from '@/src/types/api'
import { baseApi } from '../base'
import { THealthStateUpdateDto } from './types'

class HealthStateApi {
	private readonly path = '/health-state'

	async updateUserOne(
		dto: THealthStateUpdateDto,
		params?: TQueryDto<THealthStateEntity>
	) {
		return baseApi.patch(`${this.path}/user`, dto, { params })
	}
	async getUserAll(
		params: TListQueryDto<THealthStateEntity>
	): Promise<TListResponse<THealthStateEntity>> {
		return baseApi.get(`${this.path}/user`, { params })
	}
}

export const healthStateApi = new HealthStateApi()
