import { StyleSheet, Text, TextProps } from 'react-native'

interface HeaderTitleProps extends TextProps {}

export const HeaderTitle = ({ style, ...props }: HeaderTitleProps) => {
	return <Text style={[styles.title, style]} {...props} />
}

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
	},
})
