import { Button } from '@/src/components/atoms/Button'
import { TouchableButton } from '@/src/components/atoms/TouchableButton'
import { useTheme } from '@/src/hooks/useTheme'
import { TConsultEntity } from '@/src/types/api'
import { AntDesign } from '@expo/vector-icons'
import { formatDate } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { ConsultCardItem } from './ConsultCardItem'

interface ConsultCardProps {
	consult: TConsultEntity
	onRoute: () => void
	onDelete: () => void
}

export const ConsultCard = ({
	consult,
	onRoute,
	onDelete,
}: ConsultCardProps) => {
	const redColor = useTheme().red
	const primaryColor = useTheme().primary
	const { t } = useTranslation()
	console.log(consult);
	
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={{ width: 25 }} />
				<View style={{ flex: 1 }}>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 16,
							fontWeight: '600',
							color: primaryColor,
						}}
					>
						{t('CONSULT_ITEM_TITLE')}
					</Text>
				</View>
				<View
					style={{
						width: 25,
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}
				>
					<TouchableButton onPress={onDelete}>
						<AntDesign name='delete' size={24} color={redColor} />
					</TouchableButton>
				</View>
			</View>
			<View style={styles.content}>
				{consult.clinicName && (
					<ConsultCardItem
						title={`${t('COMMON_CLINIC')}:`}
						description={consult.clinicName}
					/>
				)}
				{consult.doctorName && (
					<ConsultCardItem
						title={`${t('COMMON_DOCTOR_FULL_NAME')}:`}
						description={consult.doctorName}
					/>
				)}
				{consult.service && (
					<ConsultCardItem title='Услуга' description={consult.service} />
				)}
				{consult.appointmentAt && (
					<ConsultCardItem
						title={`${t('COMMON_APPOINTMENT')}:`}
						description={formatDate(consult.appointmentAt, 'dd.MM.yyyy')}
					/>
				)}
			</View>
			<View>
				<Button variantStyle='outline' variantSize='sm' onPress={onRoute}>
					<View style={styles.button}>
						<Text style={[styles.buttonText, { color: primaryColor }]}>
							{t('COMMON_VIEW')}
						</Text>
						<AntDesign name='right' size={18} color={primaryColor} />
					</View>
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 20,
		paddingVertical: 16,
		paddingHorizontal: 13,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 8,
	},
	content: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
	},
})
