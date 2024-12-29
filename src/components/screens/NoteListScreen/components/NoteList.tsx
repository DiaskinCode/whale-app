import { Empty } from '@/src/components/atoms/Empty'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { noteApi } from '@/src/services/api/note'
import { TListResponse, TNoteEntity } from '@/src/types/api'
import { StyleSheet, View } from 'react-native'
import { Skeleton } from 'react-native-skeletons'
import { UseQueryResult } from 'react-query'
import { NoteCard } from './NoteCard'

interface NoteListProps {
	noteList: UseQueryResult<TListResponse<TNoteEntity>>
}

export const NoteList = ({ noteList }: NoteListProps) => {
	const navigation = useAppNavigation()

	const handleRoute = (note: TNoteEntity) => async () => {
		navigation.push('NoteItem', { id: note.id })
	}

	const handleDelete = (note: TNoteEntity) => async () => {
		try {
			await noteApi.removeUserOne(note.id)
			noteList.refetch()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			{noteList.isLoading ? (
				<Skeleton count={3} width='100%' height={200} color='gray' />
			) : !noteList.data?.records?.length ? (
				<Empty />
			) : (
				<View style={styles.list}>
					{noteList.data.records.map(note => (
						<NoteCard
							key={note.id}
							note={note}
							onRoute={handleRoute(note)}
							onDelete={handleDelete(note)}
						/>
					))}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
