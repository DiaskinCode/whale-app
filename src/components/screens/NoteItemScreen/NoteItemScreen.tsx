import { noteApi } from '@/src/services/api/note'
import { useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { format } from 'date-fns';
import {
	CardItem,
	CardItemDescription,
	CardItemTitle,
} from '../../atoms/CardItem'

export const NoteItemScreen = () => {
	const { params } = useRoute()
	const id = (params as any)?.id
	const { t } = useTranslation()

	const noteQuery = useQuery({
		queryKey: ['note', id],
		queryFn: async () => {
			const res = await noteApi.getUserOne(id, {
				relations: {
					tags: true,
				},
			})
			return res.record
		},
	})

	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					{noteQuery.isLoading ? (
						<></>
					) : !noteQuery.data ? (
						<></>
					) : (
					<View
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 10,
							width: '100%',
							padding: 20,
							borderRadius: 10,
							backgroundColor: '#fff',
						}}
					>
						{noteQuery.data.title && (
							<CardItem
								title={<CardItemTitle>{t('NOTE_ITEM_TITLE')}:</CardItemTitle>}
								description={
									<CardItemDescription>{noteQuery.data.title}</CardItemDescription>
								}
							/>
						)}
						{noteQuery.data.tags?.length > 0 && (
							<CardItem
								title={<CardItemTitle>{t('NOTE_ITEM_TAGS')}:</CardItemTitle>}
								description={
									<CardItemDescription>
										{noteQuery.data.tags.map((tag, index, arr) => (
											<Text key={tag.id}>
												{tag.name}
												{index !== arr.length - 1 ? ', ' : ''}
											</Text>
										))}
									</CardItemDescription>
								}
							/>
						)}
						{noteQuery.data.content && (
							<CardItem
								title={<CardItemTitle>{t('NOTE_ITEM_CONTENT')}:</CardItemTitle>}
								description={
									<CardItemDescription>{noteQuery.data.content}</CardItemDescription>
								}
							/>
						)}
						{noteQuery.data.createdAt && (
							<CardItem
								title={<CardItemTitle>{t('NOTE_ITEM_CREATED_AT')}:</CardItemTitle>}
								description={
									<CardItemDescription>
										{format(new Date(noteQuery.data.createdAt), 'HH:mm  |  dd-MM')}
									</CardItemDescription>
								}
							/>
						)}
					</View>
					)}
				</View>
			</ScrollView>
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
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
