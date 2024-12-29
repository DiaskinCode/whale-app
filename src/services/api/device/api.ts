import { baseApi } from '../base'
import { TDeviceCreateDto } from './types'

class DeviceApi {
	private readonly path = '/device'

	async postOne(args: TDeviceCreateDto) {
		return baseApi.post(`${this.path}/user`, args)
	}
}

export const deviceApi = new DeviceApi()
