import { Button } from '@/src/components/atoms/Button'
import { BottomSpace } from '@/src/components/layouts/BottomSpace'
import { BottomView } from '@/src/components/layouts/BottomView'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { purposeApi } from '@/src/services/api/purpose'

import { sessionStore } from '@/src/stores/session'
import { TPurposeEntity } from '@/src/types/api'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useQuery } from 'react-query'
import { PurposeSelectCard } from './components/PurposeSelectCard'

export const PurposeListScreen = () => {
	const { updateAccountAction } = sessionStore
	const [selectPurposesIds, setSelectPurposesIds] = useState<string[]>([])
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	const removeDuplicates = (purposes: TPurposeEntity[]) => {
		const uniquePurposes = purposes.filter((purpose, index, self) =>
			index === self.findIndex((p) => p.title === purpose.title)
		)
		return uniquePurposes
	}
	

	const userPurposeListQuery = useQuery({
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

	const publicPurposeListQuery = useQuery({
		queryKey: ['purposeList'],
		queryFn: async () => {
			const res = await purposeApi.getPublicAll({
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

	const handleSelectPurpose = (purpose: TPurposeEntity) => () => {
		const findIndex = selectPurposesIds.findIndex(item => item === purpose.id)
		if (findIndex === -1 && purpose?.id) {
			setSelectPurposesIds([...selectPurposesIds, purpose.id])
		} else {
			setSelectPurposesIds(
				selectPurposesIds.filter(item => item !== purpose.id)
			)
		}
	}

	const handleSave = async () => {
		try {
			await updateAccountAction({
				userPurposeIds: selectPurposesIds,
			})
			navigation.push('Home', {
				screen: 'UserProfile',
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!userPurposeListQuery.data) return
		// Удаляем дубликаты
		const uniqueUserPurposes = removeDuplicates(userPurposeListQuery.data.records)
		setSelectPurposesIds(
			uniqueUserPurposes.map(item => item.id!)
		)
	}, [userPurposeListQuery.data])

	return (
		<>
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					{publicPurposeListQuery.data && removeDuplicates(publicPurposeListQuery.data.records).map((purpose, index) => (
						<PurposeSelectCard
							key={index}
							isActive={selectPurposesIds.includes(purpose.id)}
							iconSource={{ uri: purpose.icon.url }}
							title={t(purpose.title)}
							onPress={handleSelectPurpose(purpose)}
						/>
					))}
				</View>
				<BottomSpace />
			</ScrollView>
			<BottomView>
				<Button variantColor='green' onPress={handleSave}>
					{!userPurposeListQuery.data?.records?.length
						? t('COMMON_CONTINUE')
						: t('COMMON_SAVE')}
				</Button>
			</BottomView>
		</>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		paddingHorizontal: 16,
	},
	content: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
		paddingVertical: 16,
	},
})
