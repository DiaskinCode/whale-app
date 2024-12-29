import { NoteFormReturn } from '@/src/hooks/useNoteForm'
import { useTheme } from '@/src/hooks/useTheme'
import { noteTagApi } from '@/src/services/api/note-tag'
import { Octicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { useQuery } from 'react-query'
import { MultiSelect } from '../atoms/DropDown'
import { Field } from '../atoms/Field'
import { FieldError } from '../atoms/FieldError'
import { IconButton } from '../atoms/IconButton'
import { Input } from '../atoms/Input'

interface NoteFormProps {
	form: NoteFormReturn
}

export const NoteForm = ({ form }: NoteFormProps) => {
	const [noteTagsSearch, setNoteTagsSearch] = useState<string>('')
	const primaryColor = useTheme().primary
	const { t } = useTranslation()

	const noteTagsListQuery = useQuery({
		queryKey: ['noteTagsList', noteTagsSearch],
		queryFn: async () => {
			const res = await noteTagApi.getUserAll({
				pagination: {
					page: 1,
					pageSize: 10,
				},
				search: {
					name: {
						like: noteTagsSearch,
					},
				},
			})
			return res
		},
	})

	const handleCreateNoteTag = async () => {
		try {
			await noteTagApi.postUserOne({
				name: noteTagsSearch,
			})
			await noteTagsListQuery.refetch()
			setNoteTagsSearch('')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<Controller
				control={form.control}
				name='title'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('NOTE_FORM_TITLE_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							textContentType='name'
							returnKeyType='next'
							placeholder={t('NOTE_FORM_TITLE_PLACEHOLDER')}
							onChangeText={onChange}
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='tags'
				render={({ field, fieldState }) => (
					<Field
						label={t('NOTE_FORM_TAGS_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<MultiSelect
							mode='modal'
							placeholder={t('NOTE_FORM_TAGS_PLACEHOLDER')}
							labelField='name'
							valueField='id'
							data={noteTagsListQuery.data?.records ?? []}
							search
							searchPlaceholder={t('COMMON_SEARCH')}
							onChangeText={setNoteTagsSearch}
							searchQuery={() => true}
							disable={!noteTagsListQuery.data}
							renderSelectedItem={item => (
								<View
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										padding: 5,
										margin: 5,
										borderRadius: 10,
										backgroundColor: '#fff',
									}}
								>
									<Text
										style={{
											fontSize: 16,
											fontWeight: '500',
											color: primaryColor,
										}}
									>
										{item.name}
									</Text>
								</View>
							)}
							renderInputSearch={onSearch => (
								<Input
									placeholder={t('COMMON_SEARCH')}
									rightIcon={
										<IconButton onPress={handleCreateNoteTag}>
											<Octicons
												name='paper-airplane'
												size={18}
												color={primaryColor}
											/>
										</IconButton>
									}
									value={noteTagsSearch}
									onChangeText={onSearch}
								/>
							)}
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				control={form.control}
				name='content'
				render={({ field: { onChange, ...field }, fieldState }) => (
					<Field
						label={t('NOTE_FORM_CONTENT_LABEL')}
						error={fieldState.error?.message ? t(fieldState.error.message) : ''}
					>
						<Input
							style={{ height: 120, verticalAlign: 'top' }}
							multiline
							placeholder={t('NOTE_FORM_CONTENT_PLACEHOLDER')}
							onChangeText={onChange}
							{...field}
						/>
					</Field>
				)}
			/>
			{form.formState.errors.root && (
				<FieldError>{form.formState.errors.root.message}</FieldError>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
