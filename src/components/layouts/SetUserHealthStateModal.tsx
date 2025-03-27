import { LangsEnum, UserHealthStatesEnum } from '@/src/constants/api'
import { DateLocales } from '@/src/constants/date-locales'
import { useTheme } from '@/src/hooks/useTheme'
import { healthStateApi } from '@/src/services/api/health-state'
import { endOfDay, format, startOfDay } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useMagicModal } from 'react-native-magic-modal'
import { useQuery } from 'react-query'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import { Modal, ModalFooter, ModalHeader } from '../atoms/Modal'

interface SetUserHealthStateModalProps {
	day: Date
}

export const EMOJIES = [
	{
		source: require('@/assets/images/terribly-emoji.png'),
		value: UserHealthStatesEnum.Terribly,
		label: 'COMMON_TERRIBLY',
	},
	{
		source: require('@/assets/images/tired-emoji.png'),
		value: UserHealthStatesEnum.Tired,
		label: 'COMMON_TIRED',
	},
	{
		source: require('@/assets/images/medium-emoji.png'),
		value: UserHealthStatesEnum.Medium,
		label: 'COMMON_MEDIUM',
	},
	{
		source: require('@/assets/images/playfully-emoji.png'),
		value: UserHealthStatesEnum.Playfully,
		label: 'COMMON_PLAYFULLY',
	},
	{
		source: require('@/assets/images/good-emoji.png'),
		value: UserHealthStatesEnum.Good,
		label: 'COMMON_GOOD',
	},
	{
		source: require('@/assets/images/excellent-emoji.png'),
		value: UserHealthStatesEnum.Excellent,
		label: 'COMMON_EXCELLENT',
	},
]

export const SetUserHealthStateModal = ({
	day,
}: SetUserHealthStateModalProps) => {
	const [healthState, setHealthState] = useState<UserHealthStatesEnum | null>()
	const [noteContent, setNoteContent] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { hide } = useMagicModal()
	const primaryColor = useTheme().primary
	const { t, i18n } = useTranslation()

	const healthStateQuery = useQuery({
		queryKey: ['healthState', day],
		queryFn: async () => {
			const res = await healthStateApi.getUserAll({
				search: {
					date: {
						from: startOfDay(day).toISOString(),
						to: endOfDay(day).toISOString(),
					},
				},
			})
			return res
		},
	})

	const handleCancel = () => {
		hide()
	}

	const handleConfirm = async () => {
		
		
		if (!healthState) return

		try {
			setIsLoading(true)
			await healthStateApi.updateUserOne({
				date: day,
				state: healthState,
				content:noteContent,
			})
			hide()
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		const validRecord = healthStateQuery.data?.records.find((record:any) =>
			record.state || record.content
		);
	
		if (validRecord?.state) {
			setHealthState(validRecord.state);
		}
	
		if (validRecord?.content) {
			setNoteContent(validRecord.content);
		}
	}, [healthStateQuery.data]);
	

	return (
		<Modal
			header={
				<ModalFooter>
					<Button
						style={{ flex: 1 }}
						variantStyle='outline'
						variantSize='sm'
						onPress={handleCancel}
					>
						{t('COMMON_CANCEL')}
					</Button>
					<Button
						style={{ flex: 1 }}
						variantSize='sm'
						disabled={isLoading || (!healthState && !noteContent)}
						onPress={handleConfirm}
					>
						{t('COMMON_SAVE')}
					</Button>
				</ModalFooter>
			}
		>
			<View style={styles.container}>
				<Text>
					{format(day, 'dd EEEE', {
						locale: DateLocales[i18n.language as LangsEnum] as any,
					})}
				</Text>
				<View
					style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
				>
					<View style={{ display: 'flex', flexDirection: 'row' }}>
						{EMOJIES.map(({ source, value }, index) => (
							<Button
								key={index}
								style={styles.emoji}
								variantColor='white'
								onPress={() => setHealthState(value)}
							>
								<Image style={styles.emojiImage} source={source} />
								<Text style={styles.emojiText} numberOfLines={1}>
									{index * 20}%
								</Text>
							</Button>
						))}
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							position: 'relative',
						}}
					>
						<LinearGradient
							colors={['#666DFB', '#E247C0']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={{
								width: '100%',
								height: 5,
								position: 'absolute',
								top: '50%',
								left: 0,
								transform: [{ translateY: -2.5 }],
								borderRadius: 5,
							}}
						/>
						{EMOJIES.map(({ value }, index) => {
							const isActive = value === healthState

							return (
								<View
									key={index}
									style={{
										flex: 1,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<View
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											width: 25,
											height: 25,
											borderRadius: 25,
											backgroundColor: isActive ? primaryColor : 'transparent',
										}}
									>
										<View
											style={{
												width: 11,
												height: 11,
												borderRadius: 11 / 2,
												backgroundColor: '#fff',
												shadowColor: '#000',
												shadowOffset: {
													width: 0,
													height: 2,
												},
												shadowOpacity: 0.25,
												shadowRadius: 3.84,
												elevation: 5,
											}}
										/>
									</View>
								</View>
							)
						})}
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							position: 'relative',
						}}
					>
						{EMOJIES.map(({ label }, index) => (
							<View
								key={index}
								style={{
									flex: 1,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Text style={styles.emojiText} numberOfLines={1}>
									{t(label)}
								</Text>
							</View>
						))}
					</View>
				</View>
				<ModalHeader title={t('HEALTH_STATE_MODAL_TITLE')} />
				<Input
					style={{ height: 120,marginTop:-15, verticalAlign: 'top' }}
					placeholder={t('HEALTH_STATE_MODAL_NOTE_PLACEHOLDER')}
					multiline
					value={noteContent}
					onChangeText={setNoteContent}
				/>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: 16,
	},
	emoji: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		height: 'auto',
		paddingVertical: 6,
	},
	emojiImage: {
		width: 40,
		height: 40,
		resizeMode: 'contain',
	},
	emojiText: {
		fontSize: 12,
		fontWeight: '400',
		color: '#000',
	},
})
