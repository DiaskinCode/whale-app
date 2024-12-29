import { TFileEntity, TResponse } from '@/src/types/api'
import { baseApi } from '../base'
import { TFileCreteDto } from './types'

class FileApi {
	private readonly path = '/file'

	async postOne(args: TFileCreteDto): Promise<TResponse<TFileEntity>> {
		const formData = new FormData()
		formData.append('file', args.file)
		formData.append('type', args.type)

		return baseApi({
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			method: 'post',
			maxBodyLength: Infinity,
			url: this.path,
			data: formData,
		})
	}
	async deleteAdminOne(id: string) {
		return baseApi.delete(`/file/admin/${id}`)
	}
}

export const fileApi = new FileApi()
