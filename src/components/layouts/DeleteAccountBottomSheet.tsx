import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useTheme } from '@/src/hooks/useTheme'
import { accountApi } from '@/src/services/api/account'
import { sessionStore } from '@/src/stores/session'
import { observer } from 'mobx-react-lite'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { BottomSheetView } from '../atoms/BottomSheetView'
import { Button } from '../atoms/Button'
import { BottomSheet, BottomSheetRef } from './BottomSheet'

interface DeleteAccountBottomSheetProps {}

export const DeleteAccountBottomSheet = observer(
	forwardRef<BottomSheetRef | null, DeleteAccountBottomSheetProps>(
		({}, ref) => {
			const { logoutAction } = sessionStore
			const [isOpen, setIsOpen] = useState<boolean>(false)
			const redColor = useTheme().red
			const navigation = useAppNavigation()
			const { t } = useTranslation()

			const handleIndexChanges = (index: number) => {
				if (index === -1) {
					setIsOpen(false)
					return
				}
				setIsOpen(true)
			}

			const handleCancel = () => {
				;(ref as any).current?.close()
			}

			const handleDelete = async () => {
				try {
					await accountApi.deleteOneUser()
					await logoutAction()
					;(ref as any).current?.close()
					navigation.push('Welcome')
				} catch (error) {
					console.log(error)
				}
			}

			return (
				<BottomSheet
					ref={ref}
					index={-1}
					style={styles.bottomSheet}
					snapPoints={[380]}
					animateOnMount={false}
					enablePanDownToClose
					onChange={handleIndexChanges}
				>
					{isOpen && (
						<BottomSheetView style={styles.container}>
							<View style={styles.content}>
								<Text style={styles.title}>
									{t('DELETE_BOTTOM_SHEET_TITLE')}
								</Text>
								<Text style={[styles.text, { color: redColor }]}>
									{t('DELETE_BOTTOM_SHEET_DESCRIPTION')}
								</Text>
							</View>

							<Button variantColor='red' onPress={handleDelete}>
								{t('DELETE_BOTTOM_SHEET_BUTTON')}
							</Button>
							<Button
								variantStyle='outline'
								variantColor='red'
								onPress={handleCancel}
							>
								{t('COMMON_CANCEL')}
							</Button>
						</BottomSheetView>
					)}
				</BottomSheet>
			)
		}
	)
)

const styles = StyleSheet.create({
	bottomSheet: {
		zIndex: 10000,
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
	},
	content: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		paddingTop: 16,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000',
		textAlign: 'center',
	},
	text: {
		fontSize: 16,
		fontWeight: '400',
		textAlign: 'center',
	},
})
