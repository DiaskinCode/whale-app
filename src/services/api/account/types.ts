import {
	TBaseAccountEntity,
	TDoctorAccountEntity,
	TUserAccountEntity,
} from '@/src/types/api'

export type TUserAccountUpdateDto = Partial<TUserAccountEntity> &
	Partial<{
		userAvatarId: string
		userPurposeIds: string[]
	}>

export type TDoctorAccountCreateDto = TBaseAccountEntity & {
	fullName: string
	doctorSpecialization: string
}

export type TDoctorAccountUpdateDto = Partial<TDoctorAccountEntity>
