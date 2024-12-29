import {
	TAccountEntity,
	TDoctorAccountEntity,
	TListQueryDto,
	TListResponse,
	TQueryDto,
	TResponse,
	TUserAccountEntity,
} from '@/src/types/api'
import { baseApi } from '../base'
import { TDoctorAccountCreateDto, TUserAccountUpdateDto } from './types'

export class AccountApi {
	async patchUserOne(
		args: TUserAccountUpdateDto,
		params?: TQueryDto<TAccountEntity>
	): Promise<TResponse<TAccountEntity>> {
		return baseApi.patch('/account/user', args, { params })
	}
	async deleteOneUser() {
		return baseApi.delete('/account/user')
	}
	async getUserOne(
		params: TListQueryDto<TUserAccountEntity>
	): Promise<TResponse<TAccountEntity>> {
		return baseApi.get('/account/user', { params })
	}
	async postDoctorAdminOne(args: TDoctorAccountCreateDto) {
		return baseApi.post('/account/doctor/admin')
	}
	async patchDoctorAdminOne(id: string, args: TDoctorAccountCreateDto) {
		return baseApi.post('/account/doctor/admin')
	}
	async deleteDoctorAdminOne(id: string) {
		return baseApi.delete(`/account/doctor/admin/${id}`)
	}
	async getDoctorAdminOne(id: string) {
		return baseApi.get(`/account/doctor/admin/${id}`)
	}
	async getDoctorAdminAll(params: TListQueryDto<TDoctorAccountEntity>) {
		return baseApi.get(`/account/doctor/admin`, { params })
	}
	async getDoctorPublicAll(
		params: TListQueryDto<TDoctorAccountEntity>
	): Promise<TListResponse<TDoctorAccountEntity>> {
		return baseApi.get(`/account/doctor/public`, { params })
	}
	async getSubscriptionStatus(accountId: string): Promise<TResponse<{ hasActiveSubscription: boolean }>> {
		return baseApi.get(`/payment/status/${accountId}`)
	}
}

export const accountApi = new AccountApi()
