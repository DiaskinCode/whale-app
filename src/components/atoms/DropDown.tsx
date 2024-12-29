import { ComponentProps, forwardRef } from 'react'
import { StyleSheet } from 'react-native'
import {
	IDropdownRef,
	IMultiSelectRef,
	Dropdown as NativeDropdown,
	MultiSelect as NativeMultiSelect,
} from 'react-native-element-dropdown'

interface DropdownProps extends ComponentProps<typeof NativeDropdown<any>> {}

export const Dropdown = forwardRef<IDropdownRef, DropdownProps>(
	(
		{
			style,
			placeholderStyle,
			selectedTextStyle,
			iconStyle,
			containerStyle,
			itemContainerStyle,
			...props
		},
		ref
	) => {
		return (
			<NativeDropdown
				ref={ref as any}
				style={[styles.dropdown, style]}
				placeholderStyle={[styles.placeholder, placeholderStyle]}
				selectedTextStyle={[styles.selectedText, selectedTextStyle]}
				iconStyle={[styles.icon, iconStyle]}
				containerStyle={[styles.container, containerStyle]}
				itemContainerStyle={[styles.itemContainer, itemContainerStyle]}
				{...props}
			/>
		)
	}
)

interface MultiSelectProps
	extends ComponentProps<typeof NativeMultiSelect<any>> {}

export const MultiSelect = forwardRef<IMultiSelectRef, MultiSelectProps>(
	(
		{
			style,
			placeholderStyle,
			selectedTextStyle,
			iconStyle,
			containerStyle,
			itemContainerStyle,
			...props
		},
		ref
	) => {
		return (
			<NativeMultiSelect
				ref={ref as any}
				style={[styles.dropdown, style]}
				placeholderStyle={[styles.placeholder, placeholderStyle]}
				selectedTextStyle={[styles.selectedText, selectedTextStyle]}
				iconStyle={[styles.icon, iconStyle]}
				containerStyle={[styles.container, containerStyle]}
				itemContainerStyle={[styles.itemContainer, itemContainerStyle]}
				{...props}
			/>
		)
	}
)

const styles = StyleSheet.create({
	dropdown: {
		width: '100%',
		height: 50,
		margin: 0,
		paddingVertical: 2.5,
		paddingHorizontal: 20,
		borderColor: '#A7ADE7',
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: 'white',
	},
	placeholder: {
		fontSize: 16,
		color: '#555555',
	},
	selectedText: {
		fontSize: 16,
		color: 'black',
	},
	container: {
		backgroundColor: 'white',
		borderColor: '#A7ADE7',
		borderWidth: 1,
		borderRadius: 10,
	},
	itemContainer: {
		borderRadius: 10,
	},
	icon: {
		width: 25,
		height: 25,
		tintColor: '#A7ADE7',
	},
})
