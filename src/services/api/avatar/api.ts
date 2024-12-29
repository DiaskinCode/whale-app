import {
	TAvatarEntity,
	TListQueryDto,
	TListResponse,
	TResponse,
} from '@/src/types/api'
import { baseApi } from '../base'
import { TAvatarCreateDto } from './types'

class AvatarApi {
	private readonly path = '/avatar'

	async postOne(args: TAvatarCreateDto): Promise<TResponse<TAvatarEntity>> {
		return baseApi.post(this.path, args)
	}
	async getPublicAll(
		params: TListQueryDto<TAvatarEntity>
	): Promise<TListResponse<TAvatarEntity>> {
		return baseApi.get(`${this.path}/public`, { params })
	}
}

export const avatarApi = new AvatarApi()
