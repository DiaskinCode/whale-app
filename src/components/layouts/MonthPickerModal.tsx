import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMagicModal } from 'react-native-magic-modal'
import { Button } from '../atoms/Button'
import { DatePicker } from '../atoms/DatePicker'
import { Modal, ModalFooter, ModalHeader } from '../atoms/Modal'

export type MonthPickerModalReturn = {
	month: string
}

export const MonthPickerModal = () => {
	const [selectMonth, setSelectMonth] = useState<string>('')
	const { hide } = useMagicModal<MonthPickerModalReturn | null>()
	const { t } = useTranslation()

	const handleCancel = () => {
		hide(null)
	}

	const handleConfirm = () => {
		if (!selectMonth) return
		const date = selectMonth.split(' ').join('-')
		hide({
			month: new Date(date).toISOString(),
		})
	}

	return (
		<Modal
			header={<ModalHeader title={t('MONTH_PICKER_MODAL_TITLE')} />}
			footer={
				<ModalFooter>
					<Button
						style={{ flex: 1 }}
						variantSize='sm'
						variantStyle='outline'
						onPress={handleCancel}
					>
						{t('COMMON_CANCEL')}
					</Button>
					<Button style={{ flex: 1 }} variantSize='sm' onPress={handleConfirm}>
						{t('COMMON_CONFIRM')}
					</Button>
				</ModalFooter>
			}
		>
			<DatePicker mode='monthYear' onMonthYearChange={setSelectMonth} />
		</Modal>
	)
}
