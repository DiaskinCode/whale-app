import { SortEnum } from '@/src/constants/api'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useTheme } from '@/src/hooks/useTheme'
import { noteApi } from '@/src/services/api/note'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { Button } from '../../atoms/Button'
import { IconButton } from '../../atoms/IconButton'
import { Input } from '../../atoms/Input'
import { BottomSheetRef } from '../../layouts/BottomSheet'
import { BottomSpace } from '../../layouts/BottomSpace'
import { BottomView } from '../../layouts/BottomView'
import { FilterBottomSheet } from '../../layouts/FilterBottomSheet'
import { NoteList } from './components/NoteList'

export const NoteListScreen = () => {
	const [isSearch, setIsSearch] = useState<boolean>(false)
	const [filter, setFilter] = useState<{
		sortBy: string
		sort: SortEnum
	}>({
		sortBy: 'createdAt',
		sort: SortEnum.DESC,
	})
	const [search, setSearch] = useState<string | null>(null)
	const filterBottomSheetRef = useRef<BottomSheetRef | null>(null)
	const primaryColor = useTheme().primary
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	const noteListQuery = useQuery({
		queryKey: ['noteList', search, filter],
		queryFn: async () => {
			const res = await noteApi.getUserAll({
				pagination: {
					page: 1,
					pageSize: 10,
				},
				search: {
					title: {
						like: search,
					},
				},
				sort: {
					[filter.sortBy]: filter.sort,
				},
				relations: {
					tags: true,
				},
			})
			return res
		},
	})

	return (
		<>
			<SafeAreaView style={styles.safeArea} edges={['bottom']}>
				<ScrollView style={styles.scrollView}>
					<View style={styles.content}>
						{isSearch ? (
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									gap: 16,
								}}
							>
								<View style={{ flex: 1 }}>
									<Input
										style={{ height: 40 }}
										placeholder={t('COMMON_SEARCH')}
										autoFocus
										value={search ?? ''}
										onChangeText={setSearch}
									/>
								</View>
								<IconButton
									onPress={() => {
										setIsSearch(false)
										setSearch('')
									}}
								>
									<Entypo name='cross' size={24} color={primaryColor} />
								</IconButton>
							</View>
						) : (
							<View style={styles.header}>
								<Text style={styles.description}>
									{t('NOTE_LIST_DESCRIPTION')}
								</Text>
								<View style={styles.filter}>
									<IconButton
										onPress={() => {
											setIsSearch(true)
											filterBottomSheetRef.current?.close()
										}}
									>
										<AntDesign name='search1' size={24} color={primaryColor} />
									</IconButton>
									<IconButton
										onPress={() => filterBottomSheetRef.current?.expand()}
									>
										<AntDesign name='filter' size={24} color={primaryColor} />
									</IconButton>
								</View>
							</View>
						)}
						<NoteList noteList={noteListQuery} />
					</View>
					<BottomSpace />
				</ScrollView>
				<BottomView>
					<Button onPress={() => navigation.push('CreateNote')}>
						{t('NOTE_LIST_BUTTON')}
					</Button>
				</BottomView>
			</SafeAreaView>
			<FilterBottomSheet
				ref={filterBottomSheetRef}
				sortByOptions={[
					{
						label: t('NOTE_LIST_SORT_BY_CREATED_AT'),
						value: 'createdAt',
					},
				]}
				defaultSortBy={filter.sortBy}
				defaultSort={filter.sort}
				onFilter={filter => {
					setFilter(filter)
					filterBottomSheetRef.current?.close()
				}}
			/>
		</>
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
	header: {
		display: 'flex',
		flexDirection: 'row',
		gap: 16,
	},
	description: {
		flex: 2,
		fontSize: 14,
		fontWeight: '600',
		color: '#aaa',
	},
	filter: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: 8,
	},
})
