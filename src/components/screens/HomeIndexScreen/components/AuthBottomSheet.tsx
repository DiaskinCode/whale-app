import { Button } from '@/src/components/atoms/Button'
import { IconButton } from '@/src/components/atoms/IconButton'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useTheme } from '@/src/hooks/useTheme'
import { sessionStore } from '@/src/stores/session'
import { AntDesign } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const AuthBottomSheet = observer(() => {
	const { isAuth } = sessionStore
	const [isBottomSheetVisible, setIsBottomSheetVisible] =
		useState<boolean>(false)
	const { bottom } = useSafeAreaInsets()
	const primaryColor = useTheme().primary
	const navigation = useAppNavigation()
	const { t } = useTranslation()

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: withTiming(isBottomSheetVisible ? 0 : 300, {
						duration: 500,
					}),
				},
			],
		}
	}, [isBottomSheetVisible])

	const handleBack = () => {
		navigation.push('Welcome')
	}

	useEffect(() => {
		setIsBottomSheetVisible(!isAuth)
	}, [isAuth])

	if (isAuth) return null

	return (
		<Animated.View
			style={[{ paddingBottom: bottom }, styles.container, animatedStyle]}
		>
			<View style={styles.backContainer}>
				<IconButton style={{ borderRadius: 40 }} onPress={handleBack}>
					<AntDesign name='arrowleft' size={18} />
				</IconButton>
			</View>
			<View style={styles.content}>
				<Text style={styles.title}>{t('AUTH_BOTTOM_SHEET_TITLE')}</Text>
				<View>
					<Button
						style={[{ shadowColor: primaryColor }, styles.button]}
						variantSize='sm'
						onPress={() => navigation.push('SignIn')}
					>
						{t('AUTH_BOTTOM_SHEET_BUTTON')}
					</Button>
				</View>
			</View>
		</Animated.View>
	)
})

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		height: '40%',
		paddingTop: 31,
		paddingHorizontal: 16,
		position: 'absolute',
		bottom: 0,
		left: 0,
		backgroundColor: '#fff',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		// shadowColor: '#000',
		// shadowOffset: {
		// 	width: 0,
		// 	height: 2,
		// },
		// shadowOpacity: 0.4,
		// shadowRadius: 10,
	},
	backContainer: {
		position: 'absolute',
		top: -50,
		left: 10,
	},
	content: {
		flex: 1,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: 30,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000',
		textAlign: 'center',
	},
	button: {
		shadowOpacity: 0.6,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 10,
	},
})
