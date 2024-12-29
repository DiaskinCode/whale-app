import { SelectButton } from '@/src/components/atoms/SelectButton'
import { ComponentProps } from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text } from 'react-native'

interface PurposeSelectCardProps
	extends Omit<ComponentProps<typeof SelectButton>, 'children'> {
	iconSource: ImageSourcePropType
	title: string
}

export const PurposeSelectCard = ({
	style,
	iconSource,
	title,
	...props
}: PurposeSelectCardProps) => {
	return (
		<SelectButton style={[styles.container, style]} {...props}>
			<Text style={styles.title}>{title}</Text>
		</SelectButton>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		gap: 15,
		paddingHorizontal: 18,
		paddingVertical: 15,
	},
	icon: {
		width: 20,
		height: 20,
		resizeMode: 'contain',
	},
	title: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
		color: '#000',
	},
})
