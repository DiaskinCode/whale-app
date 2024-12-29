import { forwardRef } from 'react'

import NativeBottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet'
import { BottomSheetHandle } from '../atoms/BottomSheetHandle'

export type BottomSheetRef = NativeBottomSheet

export const BottomSheet = forwardRef<NativeBottomSheet, BottomSheetProps>(
	function BottomSheet({ children, ...props }, ref) {
		return (
			<NativeBottomSheet
				ref={ref}
				handleComponent={BottomSheetHandle}
				{...props}
			>
				{children}
			</NativeBottomSheet>
		)
	}
)
