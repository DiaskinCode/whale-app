import { AccountRolesEnum, LangsEnum } from '@/src/constants/api'

export type TRegisterDto = {
	email?: string
	phone?: string
	password: string
	role: AccountRolesEnum
	lang: LangsEnum
}

export type TLoginDto = {
	identifier: string
	password: string
}

export type TGoogleLoginDto = {
	idToken: string
	lang: LangsEnum
}

export type TRefreshDto = {
	refreshToken: string
}

export type TLogoutDto = {
	refreshToken: string
}

export type TSessionResponse = {
	accessToken: string
	refreshToken: string
}

export type TRefreshResponse = {
	accessToken: string
}
