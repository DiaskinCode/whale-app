import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

const noteSchema = z.object({
	title: z.string().min(1, { message: 'REQUIRED' }),
	tags: z.array(z.string()).optional(),
	content: z.string().min(1, { message: 'REQUIRED' }),
})
type NoteSchema = z.infer<typeof noteSchema>
export type NoteFormReturn = UseFormReturn<NoteSchema>

export const useNoteForm = () => {
	return useForm<NoteSchema>({
		defaultValues: {
			title: '',
			tags: [],
			content: '',
		},
		resolver: zodResolver(noteSchema),
	})
}
