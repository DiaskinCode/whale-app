import { Empty } from '@/src/components/atoms/Empty'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { consultApi } from '@/src/services/api/consult'
import { TConsultEntity, TListResponse } from '@/src/types/api'
import { StyleSheet, View } from 'react-native'
import { Skeleton } from 'react-native-skeletons'
import { UseQueryResult } from 'react-query'
import { ConsultCard } from './ConsultCard'

interface ConsultListProps {
	consultListQuery: UseQueryResult<TListResponse<TConsultEntity>>
}

export const ConsultList = ({ consultListQuery }: ConsultListProps) => {
	const navigation = useAppNavigation()

	const handleRoute = (consult: TConsultEntity) => async () => {
		navigation.push('ConsultItem', { id: consult.id })
	}

	const handleDelete = (consult: TConsultEntity) => async () => {
		try {
			await consultApi.deleteUserOne(consult.id)
			consultListQuery.refetch()
		} catch (error) {
			console.log(error)
		}
	}
	

	return (
		<>
			{consultListQuery.isLoading ? (
				<Skeleton count={3} width='100%' height={200} color='gray' />
			) : !consultListQuery.data?.records?.length ? (
				<Empty />
			) : (
				<View style={styles.list}>
					{consultListQuery.data.records.map(consult => (
						<ConsultCard
							key={consult.id}
							consult={consult}
							onRoute={handleRoute(consult)}
							onDelete={handleDelete(consult)}
						/>
					))}
				</View>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	list: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
