import { Image, StyleSheet, Text, View } from 'react-native'

interface IntroCardProps {
	image: any
	title: string
	description: string
}

export const IntroCard = ({ image, title, description }: IntroCardProps) => {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={image} />
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		gap: 18,
		width: '100%',
		height: 'auto',
		backgroundColor: '#fff',
		borderRadius: 10,
		paddingVertical: 16,
		paddingHorizontal: 12,
	},
	image: {
		resizeMode: 'contain',
	},
	content: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 2,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#000',
	},
	description: {
		fontSize: 14,
		fontWeight: '300',
		color: '#000',
	},
})
