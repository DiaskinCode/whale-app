import { SelectButton } from '@/src/components/atoms/SelectButton'
import { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'

interface FilterSelectButtonProps extends ComponentProps<typeof SelectButton> {}

export const FilterSelectButton = ({
	children,
	...props
}: FilterSelectButtonProps) => {
	return (
		<SelectButton style={styles.filterSelectButton} {...props}>
			{children}
		</SelectButton>
	)
}

const styles = StyleSheet.create({
	filterSelectButton: {
		paddingVertical: 6,
		paddingHorizontal: 14,
	},
})
