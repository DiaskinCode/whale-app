import { TListQueryDto, TListResponse, TNoteTagEntity } from '@/src/types/api'
import { baseApi } from '../base'
import { TNoteTagCreateDto } from './types'

class NoteTagApi {
	private readonly path = '/note-tag'

	async postUserOne(args: TNoteTagCreateDto) {
		return baseApi.post(`${this.path}/user`, args)
	}
	async getUserAll(
		params: TListQueryDto<TNoteTagEntity>
	): Promise<TListResponse<TNoteTagEntity>> {
		return baseApi.get(`${this.path}/user`, { params })
	}
}

export const noteTagApi = new NoteTagApi()
