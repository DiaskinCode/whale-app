export type TConsultCreateDto = {
	clinicId: string
	doctorId: string
	service: string
	appointmentAt: Date
	complaints?: string
	anamnesis?: string
	allergies?: string
	diagnosis?: string
	recommendations?: string
	medicationIds?: string[]
	nextAppointmentAt?: Date
	photoId?: string
}

export type TConsultUpdateDto = Partial<TConsultCreateDto> &
	Partial<{
		clinicId: string
		doctorId: string
		medicationIds: string[]
	}>
