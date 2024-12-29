export type TNoteCreateDto = {
	title: string
	content: string
	tagIds: string[]
}

export type TNoteUpdateDto = Partial<TNoteCreateDto> &
	Partial<{
		tagIds: string[]
	}>
