import { format } from 'date-fns'
import { useState } from 'react'
import { useMagicModal } from 'react-native-magic-modal'
import { Button } from '../atoms/Button'
import { DatePicker } from '../atoms/DatePicker'
import { Modal, ModalFooter, ModalHeader } from '../atoms/Modal'

interface DatePickerModalProps {
	defaultDate?: string
}

export type DatePickerModalReturn = {
	date: string
}

export const DatePickerModal = ({ defaultDate }: DatePickerModalProps) => {
	const [selectDate, setSelectDate] = useState<string>(defaultDate ?? '')
	const { hide } = useMagicModal<DatePickerModalReturn | null>()

	const handleCancel = () => {
		hide(null)
	}

	const handleConfirm = () => {
		const date = selectDate.split('/').join('-')
		hide({
			date: new Date(date).toISOString(),
		})
	}

	return (
		<Modal
			header={<ModalHeader title='Выберите дату' />}
			footer={
				<ModalFooter>
					<Button
						style={{
							flex: 1,
						}}
						variantSize='sm'
						variantStyle='outline'
						onPress={handleCancel}
					>
						Отмена
					</Button>
					<Button style={{ flex: 1 }} variantSize='sm' onPress={handleConfirm}>
						Подтвердить
					</Button>
				</ModalFooter>
			}
		>
			<DatePicker
				mode='calendar'
				current={format(new Date(), 'yyyy/MM/dd')}
				selected={selectDate}
				onDateChange={setSelectDate}
			/>
		</Modal>
	)
}
