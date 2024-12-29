import {
	TListQueryDto,
	TListResponse,
	TNoteEntity,
	TQueryDto,
	TResponse,
} from '@/src/types/api'
import { baseApi } from '../base'
import { TNoteCreateDto, TNoteUpdateDto } from './types'

class NoteApi {
	private readonly path = '/note'

	async postUserOne(args: TNoteCreateDto) {
		return baseApi.post(`${this.path}/user`, args)
	}
	async patchUserOne(id: string, args: TNoteUpdateDto) {
		return baseApi.patch(`${this.path}/user/${id}`, args)
	}
	async removeUserOne(id: string) {
		return baseApi.delete(`${this.path}/user/${id}`)
	}
	async getUserOne(
		id: string,
		params: TQueryDto<TNoteEntity>
	): Promise<TResponse<TNoteEntity>> {
		return baseApi.get(`${this.path}/user/${id}`, { params })
	}
	async getUserAll(
		params: TListQueryDto<TNoteEntity>
	): Promise<TListResponse<TNoteEntity>> {
		return baseApi.get(`${this.path}/user`, { params })
	}
}

export const noteApi = new NoteApi()
