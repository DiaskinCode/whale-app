import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useNoteForm } from '@/src/hooks/useNoteForm'
import { noteApi } from '@/src/services/api/note'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '../../atoms/Button'
import { BottomSpace } from '../../layouts/BottomSpace'
import { BottomView } from '../../layouts/BottomView'
import { NoteForm } from '../../molecules/NoteForm'

export const CreateNoteScreen = () => {
	const form = useNoteForm()
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	const handleSubmit = form.handleSubmit(async data => {
		try {
			await noteApi.postUserOne({
				title: data.title,
				tagIds: data.tags!,
				content: data.content,
			})
			navigation.push('NoteList')
		} catch (error) {
			console.log(error)
		}
	})

	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					<NoteForm form={form} />
				</View>
				<BottomSpace />
			</ScrollView>
			<BottomView>
				<Button
					disabled={form.formState.isSubmitting || !form.formState.isValid}
					onPress={handleSubmit}
				>
					{t('COMMON_SAVE')}
				</Button>
			</BottomView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 16,
	},
	content: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		paddingVertical: 16,
	},
})
