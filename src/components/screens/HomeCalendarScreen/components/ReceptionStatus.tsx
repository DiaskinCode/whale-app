import { MedicationReceptionStatusEnum } from '@/src/constants/api'
import { StyleSheet, Text, View, ViewProps } from 'react-native'

interface ReceptionStatusProps extends Omit<ViewProps, 'children'> {
	status: MedicationReceptionStatusEnum
}

export const ReceptionStatus = ({
	status,
	style,
	...props
}: ReceptionStatusProps) => {
	const getStyles = () => {
		if (status === MedicationReceptionStatusEnum.Completed) {
			return {
				backgroundColor: '#30CE49',
			}
		}
		if (status === MedicationReceptionStatusEnum.Declined) {
			return {
				backgroundColor: '#EF4444',
			}
		}
		if (status === MedicationReceptionStatusEnum.Skipped) {
			return {
				backgroundColor: '#EF4444',
			}
		}
		if (status === MedicationReceptionStatusEnum.Pending) {
			return {
				backgroundColor: '#FA8E55',
			}
		}
	}

	return (
		<View style={[styles.container, getStyles(), style]} {...props}>
			<Text style={styles.text}>
				{status === MedicationReceptionStatusEnum.Completed ? (
					<>Принято</>
				) : status === MedicationReceptionStatusEnum.Declined ? (
					<>Отклонено</>
				) : status === MedicationReceptionStatusEnum.Skipped ? (
					<>Пропущено</>
				) : status === MedicationReceptionStatusEnum.Pending ? (
					<>В ожидании</>
				) : null}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 5,
		borderRadius: 20,
	},
	text: {
		fontSize: 13,
		fontWeight: '600',
		color: '#fff',
	},
})
