import { TouchableButton } from '@/src/components/atoms/TouchableButton'
import { useTheme } from '@/src/hooks/useTheme'
import { TMedicationPlanEntity } from '@/src/types/api'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'

interface UserMedicationListCardProps {
	userMedication: TMedicationPlanEntity
	onDelete: () => void
}

export const UserMedicationListCard = ({
	userMedication,
	onDelete,
}: UserMedicationListCardProps) => {
	const primaryColor = useTheme().primary
	const redColor = useTheme().red
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableButton onPress={onDelete}>
					<AntDesign name='delete' size={24} color={redColor} />
				</TouchableButton>
			</View>
			<View style={styles.content}>
				<View style={styles.left}>
					<AntDesign name='medicinebox' size={24} color={primaryColor} />
					<Text style={styles.title}>
						{userMedication?.medication?.title ?? 'Не указано'}
					</Text>
				</View>
				<Text style={styles.duration}>
					<Text>{'Продолжительность:\n'}</Text>
					{!userMedication?.duration || !userMedication?.durationValue ? (
						<Text>Не указано</Text>
					) : (
						<Text>
							{userMedication.duration} {t(`COMMON_${userMedication.durationValue}`)}
						</Text>
					)}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		padding: 16,
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		gap: 16,
	},
	left: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 8,
		height: '100%',
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
	},

	duration: {
		flex: 1,
		fontSize: 14,
		fontWeight: '400',
		textAlign: 'right',
	},
})
