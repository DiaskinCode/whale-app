import { useState } from 'react'
import { useMagicModal } from 'react-native-magic-modal'
import { Button } from '../atoms/Button'
import { DatePicker } from '../atoms/DatePicker'
import { Modal, ModalFooter, ModalHeader } from '../atoms/Modal'

export type TimePickerModalReturn = {
	time: string
}

export const TimePickerModal = () => {
	const { hide } = useMagicModal<TimePickerModalReturn | null>()
	const [selectTime, setSelectTime] = useState<string>('')

	const handleCancel = () => {
		hide(null)
	}

	const handleConfirm = () => {
		if (selectTime === '') return
		hide({
			time: selectTime,
		})
	}

	return (
		<Modal
			header={<ModalHeader title='Выберите время' />}
			footer={
				<ModalFooter>
					<Button
						style={{ flex: 1 }}
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
			<DatePicker mode='time' minuteInterval={1} onTimeChange={setSelectTime} />
		</Modal>
	)
}
