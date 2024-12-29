import { Avatar } from '@/src/components/atoms/Avatar'
import { Empty } from '@/src/components/atoms/Empty'
import { SelectButton } from '@/src/components/atoms/SelectButton'
import { getColumnData } from '@/src/helpers/getColumnData'
import { TAvatarEntity, TListResponse } from '@/src/types/api'
import { ReactNode } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Skeleton } from 'react-native-skeletons'
import { UseQueryResult } from 'react-query'

interface AvatarListProps {
	avatarList: UseQueryResult<TListResponse<TAvatarEntity>>
	selectAvatarId: string | undefined
	setSelectAvatarId: (avatarId: string) => void
	additional?: ReactNode
}

export const AvatarList = ({
	avatarList,
	selectAvatarId,
	setSelectAvatarId,
	additional,
}: AvatarListProps) => {
	return (
		<View>
			{avatarList.isLoading ? (
				<FlatList
					scrollEnabled={false}
					numColumns={3}
					columnWrapperStyle={{ gap: 10 }}
					contentContainerStyle={{ gap: 10 }}
					data={getColumnData(Array.from({ length: 9 }), 3)}
					renderItem={() => (
						<View style={{ flex: 1, aspectRatio: 1 }}>
							<Skeleton borderRadius={100} height='100%' color='gray' />
						</View>
					)}
				/>
			) : !avatarList.data?.records?.length ? (
				<Empty />
			) : (
				<View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
					<FlatList
						scrollEnabled={false}
						numColumns={3}
						data={getColumnData(avatarList.data?.records, 3)}
						columnWrapperStyle={{ gap: 10 }}
						contentContainerStyle={{ gap: 10 }}
						renderItem={({ item }) => (
							<>
								{!item ? (
									<View style={{ flex: 1 }} />
								) : (
									<SelectButton
										key={item.file?.url}
										style={{
											flex: 1,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											aspectRatio: 1,
											backgroundColor: '#fff',
											borderRadius: 1000,
										}}
										isActive={selectAvatarId === item.id}
										onPress={() => setSelectAvatarId(item.id!)}
									>
										<Avatar
											style={styles.avatar}
											source={{ uri: item.file?.url }}
										/>
									</SelectButton>
								)}
							</>
						)}
						ListEmptyComponent={<View style={styles.avatar} />}
					/>
					{additional}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
	},
	avatar: {
		flex: 1,
		aspectRatio: 0.8,
		borderRadius: 1000,
	},
})
