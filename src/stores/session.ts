import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeAutoObservable, reaction } from 'mobx'
import { TAccountModel } from '../models/api'
import { SessionModel } from '../models/session'
import { accountApi, TUserAccountUpdateDto } from '../services/api/account'
import {
	authApi,
	TGoogleLoginDto,
	TLoginDto,
	TRegisterDto,
} from '../services/api/auth'

export class SessionStore {
	session: SessionModel | null = null
	account: TAccountModel | null = null

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })

		reaction(
			() => this.session,
			async () => {
				if (!this.session) {
					this.account = null
					return
				}
				try {
					const res = await accountApi.getUserOne({
						relations: {
							userAvatar: {
								file: true,
							},
						},
					})
					this.account = res.record
				} catch (error) {
					console.log(error)
				}
			}
		)
	}

	get isAuth() {
		return !!this.session
	}

	async userRegisterAction(args: TRegisterDto) {
		const res = await authApi.userRegister(args)
		return res.record
	}
	async loginAction(args: TLoginDto) {
		const res = await authApi.login(args)
		await this.setSessionToStorageAction(res.record)
		this.session = res.record
		return res.record
	}
	async googleLoginAction(args: TGoogleLoginDto) {
		const res = await authApi.googleLogin(args)
		await this.setSessionToStorageAction(res.record)
		this.session = res.record
		return res.record
	}
	async refreshAction() {
		if (!this.session?.refreshToken) return
		const res = await authApi.refresh({
			refreshToken: this.session.refreshToken,
		})
		this.session = { ...this.session, accessToken: res.record.accessToken }
		return res.record
	}
	async logoutAction() {
		try {
			if (!this.session?.refreshToken) return
			await authApi.logout({ refreshToken: this.session.refreshToken })
		} catch (error) {
			console.log(error)
		}
		try {
			await this.removeSessionFromStorageAction()
		} catch (error) {
			console.log(error)
		}
		this.session = null
	}

	async updateAccountAction(args: TUserAccountUpdateDto) {
		const res = await accountApi.patchUserOne(args, {
			relations: {
				userAvatar: {
					file: true,
				},
			},
		})
		this.account = { ...this.account, ...res.record }
	}

	async setSessionToStorageAction(session: SessionModel) {
		await AsyncStorage.setItem('session', JSON.stringify(session))
	}
	async getSessionFromStorageAction() {
		const session = await AsyncStorage.getItem('session')
		if (session) {
			this.session = JSON.parse(session) as SessionModel
		}
		return this.session
	}
	async removeSessionFromStorageAction() {
		await AsyncStorage.removeItem('session')
	}
}

export const sessionStore = new SessionStore()
