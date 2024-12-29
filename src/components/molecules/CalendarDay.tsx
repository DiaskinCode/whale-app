import { UserHealthStatesEnum } from '@/src/constants/api'
import { format } from 'date-fns'
import { Image, StyleSheet, Text, View, ViewProps } from 'react-native'

interface CalendarDayProps extends ViewProps {
	date: Date
	receptionsCount: number
	completedReceptionsCount: number
	healthState?: UserHealthStatesEnum
	as?: React.ElementType
}

export const CalendarDay = ({
	style,
	date,
	receptionsCount,
	completedReceptionsCount,
	healthState,
	as,
	...props
}: CalendarDayProps) => {
	const Component = as ?? View

	const getTextStyle = () => {
		if (receptionsCount === 0) return { color: '#73779E' }
		return { color: '#fff' }
	}

	const getHealthStateStyle = () => {
		if (healthState) return []
		return [
			{
				borderStyle: 'dashed',
				borderWidth: 1,
				borderRadius: 30,
				borderColor: receptionsCount === 0 ? '#73779E' : '#fff',
			},
		]
	}

	const getHealthStateImageSource = (healthState: UserHealthStatesEnum) => {
		switch (healthState) {
			case UserHealthStatesEnum.Terribly:
				return require('@/assets/images/terribly-emoji.png')
			case UserHealthStatesEnum.Tired:
				return require('@/assets/images/tired-emoji.png')
			case UserHealthStatesEnum.Medium:
				return require('@/assets/images/medium-emoji.png')
			case UserHealthStatesEnum.Playfully:
				return require('@/assets/images/playfully-emoji.png')
			case UserHealthStatesEnum.Good:
				return require('@/assets/images/good-emoji.png')
			case UserHealthStatesEnum.Excellent:
				return require('@/assets/images/excellent-emoji.png')
		}
	}

	return (
		<Component style={[styles.container, style]} {...props}>
			<Text style={[styles.date, getTextStyle()]}>{format(date, 'dd')}</Text>
			<Text style={[styles.receptionsCount, getTextStyle()]}>
				{completedReceptionsCount}/{receptionsCount}
			</Text>
			<View style={[styles.healthState, ...(getHealthStateStyle() as any)]}>
				{healthState && (
					<Image
						style={styles.healthStateImage}
						source={getHealthStateImageSource(healthState)}
					/>
				)}
			</View>
		</Component>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5,
		paddingTop: 5,
		paddingBottom: 10,
		// paddingHorizontal: 10,
	},
	date: {
		fontSize: 16,
		fontWeight: '300',
	},
	receptionsCount: {
		fontSize: 14,
		fontWeight: '600',
	},
	healthState: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 30,
		height: 30,
	},
	healthStateImage: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
})
