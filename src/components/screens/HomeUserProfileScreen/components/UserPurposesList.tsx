import { Empty } from '@/src/components/atoms/Empty'
import { purposeApi } from '@/src/services/api/purpose'
import { observer } from 'mobx-react-lite'
import { Image, StyleSheet, View } from 'react-native'
import { Skeleton } from 'react-native-skeletons'
import { useQuery } from 'react-query'

export const UserPurposesList = observer(() => {
	const userPurposeList = useQuery({
		queryKey: ['userPurposeList'],
		queryFn: async () => {
			const res = await purposeApi.getUserAll({
				pagination: {
					page: 1,
					pageSize: 10,
				},
				relations: {
					icon: true,
				},
			})
			return res
		},
	})

	return (
		<>
			{userPurposeList.isLoading ? (
				<View style={styles.container}>
					<Skeleton count={10} width={20} height={20} color='gray' />
				</View>
			) : !userPurposeList.data?.records?.length ? (
				<Empty />
			) : (
				<View style={styles.container}>
					{userPurposeList.data.records.map((purpose, index) => (
						<Image
							key={index}
							style={styles.item}
							source={{ uri: purpose.icon?.url }}
						/>
					))}
				</View>
			)}
		</>
	)
})

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 16,
	},
	item: {
		width: 20,
		height: 20,
		resizeMode: 'contain',
	},
})
