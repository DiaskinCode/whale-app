import { useTheme } from '@/src/hooks/useTheme'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View, ViewProps } from 'react-native'
import { TouchableButton } from './TouchableButton'

interface CollapsibleProps extends ViewProps {}

export const Collapsible = ({
	children,
	style,
	...props
}: CollapsibleProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const primaryColor = useTheme().primary
	const { t } = useTranslation()

	return (
		<View style={[styles.container, style]} {...props}>
			<TouchableButton
				style={styles.button}
				onPress={() => setIsOpen(prev => !prev)}
			>
				<Text style={[styles.buttonText, { color: primaryColor }]}>
					{isOpen ? t('COMMON_HIDE') : t('COMMON_SHOW')}
				</Text>
				<AntDesign
					name={isOpen ? 'up' : 'down'}
					size={18}
					color={primaryColor}
				/>
			</TouchableButton>

			{isOpen && children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
	},
})
