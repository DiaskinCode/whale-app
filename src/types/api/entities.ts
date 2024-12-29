import {
	AccountRolesEnum,
	FileTypesEnum,
	LangsEnum,
	MedicationDoseValuesEnum,
	MedicationDurationValuesEnum,
	MedicationReceptionDaysEnum,
	MedicationReceptionStatusEnum,
	MedicationShapesEnum,
	MedicationTypesEnum,
	UserGendersEnum,
	UserHealthStatesEnum,
} from '@/src/constants/api'

export type TBaseEntity = {
	id: string
	createdAt: Date
	updatedAt: Date | null
	deletedAt: Date | null
	createdBy: TAccountEntity | null // ManyToOne (No Relation)
	updatedBy: TAccountEntity | null // ManyToOne (No Relation)
	deletedBy: TAccountEntity | null // ManyToOne (No Relation)
}

export type TBaseAccountEntity = TBaseEntity & {
	email: string | null
	phone: string | null
	fullName: string | null
	password: string
	role: AccountRolesEnum
	lang: LangsEnum
	loginAt: Date | null
}
export type TUserAccountEntity = TBaseAccountEntity & {
	userAge: number | null
	userGender: UserGendersEnum | null
	userIsNotificationEnabled: boolean | null
	userAvatar: TAvatarEntity | null // ManyToOne
	userPurposes: TPurposeEntity[] // ManyToMany
	userHealthStates: THealthStateEntity[] // OneToMany
	userDevices: TDeviceEntity[] // OneToMany
	userMedicationPlans: TMedicationPlanEntity[] // OneToMany
	userConsults: TConsultEntity[] // OneToMany
	userNotes: TNoteEntity[] // OneToMany
}
export type TDoctorAccountEntity = TBaseAccountEntity & {
	doctorSpecialization: string | null
	doctorConsults: TConsultEntity[] // OneToMany
}
export type TAdminAccountEntity = TBaseAccountEntity
export type TAccountEntity = TUserAccountEntity &
	TDoctorAccountEntity &
	TAdminAccountEntity

export type TAvatarEntity = TBaseEntity & {
	file: TFileEntity // OneToOne
	accounts: TUserAccountEntity[] // OneToMany
}

export type TPurposeEntity = TBaseEntity & {
	title: string
	icon: TFileEntity // ManyToOne
	accounts: TUserAccountEntity[] // ManyToMany
}

export type TMedicationEntity = TBaseEntity & {
	type: MedicationTypesEnum
	title: string
	shape: MedicationShapesEnum
	medicationPlans: TMedicationPlanEntity[] // OneToMany
	consults: TConsultEntity[] // ManyToMany
}

export type TMedicationPlanEntity = TBaseEntity & {
	startAt: Date
	dose: number
	doseValue: MedicationDoseValuesEnum
	duration: number
	durationValue: MedicationDurationValuesEnum
	days: MedicationReceptionDaysEnum[]
	times: string[]
	isReminder: boolean
	medication: TMedicationEntity // ManyToOne
	receptions: TMedicationPlanReceptionEntity[] // OneToMany
	account: TUserAccountEntity // ManyToOne
}
export type TMedicationPlanReceptionEntity = TBaseEntity & {
	date: Date
	status: MedicationReceptionStatusEnum
	medicationPlan: TMedicationPlanEntity // ManyToOne
}

export type TConsultEntity = TBaseEntity & {
	service: string
	doctorName: string
	clinicName: string
	appointmentAt: Date
	complaints: string
	anamnesis: string
	allergies: string
	diagnosis: string
	recommendations: string
	nextAppointmentAt: Date
	clinic: TClinicEntity // ManyToOne
	doctorAccount: TDoctorAccountEntity // ManyToOne
	photo: TFileEntity // OneToOne
	medications: TMedicationEntity[] // ManyToMany
	account: TUserAccountEntity // ManyToOne
}

export type TClinicEntity = TBaseEntity & {
	title: string
	consults: TConsultEntity[] // OneToMany
}

export type TNoteEntity = TBaseEntity & {
	title: string
	content: string
	tags: TNoteTagEntity[] // ManyToMany
	account: TUserAccountEntity // ManyToOne
}
export type TNoteTagEntity = TBaseEntity & {
	name: string
	notes: TNoteEntity[] // ManyToMany
}

export type THealthStateEntity = TBaseEntity & {
	date: Date
	state: UserHealthStatesEnum | null
	content: any
	account: TUserAccountEntity // ManyToOne
}

export type TFileEntity = TBaseEntity & {
	type: FileTypesEnum
	filename: string
	url: string
	size: number
	avatars: TAvatarEntity[] // OneToMany
	purposes: TPurposeEntity[] // OneToMany
	consult: TConsultEntity // OneToOne
}

export type TDeviceEntity = TBaseEntity & {
	deviceId: string
	account: TUserAccountEntity // ManyToOne
}
