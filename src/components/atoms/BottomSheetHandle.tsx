import { StyleSheet } from 'react-native'

import { useTheme } from '@/src/hooks/useTheme'
import {
	BottomSheetHandle as NativeBottomSheetHandle,
	BottomSheetHandleProps as NativeBottomSheetHandleProps,
} from '@gorhom/bottom-sheet'

interface BottomSheetHandleProps extends NativeBottomSheetHandleProps {}

export const BottomSheetHandle = ({ ...props }: BottomSheetHandleProps) => {
	const secondaryColor = useTheme().secondary

	return (
		<NativeBottomSheetHandle
			style={[styles.container, { backgroundColor: secondaryColor }]}
			{...props}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 103,
		height: 1,
		marginHorizontal: 10,
		borderRadius: 5,
	},
})
