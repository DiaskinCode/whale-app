import { TResponse } from '@/src/types/api'
import { baseApi } from '../base'
import {
	TGoogleLoginDto,
	TLoginDto,
	TRefreshDto,
	TRefreshResponse,
	TRegisterDto,
	TSessionResponse,
} from './types'

class AuthApi {
	private readonly path = '/auth'

	async userRegister(args: TRegisterDto): Promise<TResponse<void>> {
		return baseApi.post(`${this.path}/register`, args)
	}
	async login(args: TLoginDto): Promise<TResponse<TSessionResponse>> {
		return baseApi.post(`${this.path}/login`, args)
	}
	async googleLogin(
		args: TGoogleLoginDto
	): Promise<TResponse<TSessionResponse>> {
		return baseApi.post('/oauth/google', args)
	}
	async refresh(args: TRefreshDto): Promise<TResponse<TRefreshResponse>> {
		return baseApi.post(`${this.path}/refresh`, args)
	}
	async logout(args: TRefreshDto): Promise<TResponse<void>> {
		return baseApi.post(`${this.path}/logout`, args)
	}
}

export const authApi = new AuthApi()
