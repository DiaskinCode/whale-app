import { NavigatorScreenParams } from '@react-navigation/native'

export type TRootStackParamList = {
	Welcome: undefined

	Home: NavigatorScreenParams<THomeTabParamList>

	SignIn: undefined
	SignUp: undefined

	ForgotPassword: undefined
	ResetPassword: { email: string };

	PurposeList: undefined
	AvatarList: undefined

	Subscription: undefined
	PayScreen: undefined

	SubscriptionEnded: undefined

	// UserProfile
	EditUserProfile: undefined

	// UserProfile
	CreateOwnUserMedication: undefined

	// UserMedication
	CreateUserMedication: undefined
	EditUserMedication: { id: string }
	UserMedicationList: undefined

	// Consult
	CreateConsult: undefined
	ConsultList: undefined
	ConsultItem: { id: string }

	// Note
	CreateNote: undefined
	NoteList: undefined
	NoteItem: { id: string }

	Monitoring: undefined
	MonitoringReport: {
		from: string
		to: string
	}
}

export type THomeTabParamList = {
	MedicationCalendar: undefined
	Index: undefined
	UserProfile: undefined
}
