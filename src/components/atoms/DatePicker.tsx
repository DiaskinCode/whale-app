import { useTheme } from '@/src/hooks/useTheme'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ModernDatePicker, {
	ModernDatepickerProps,
} from 'react-native-modern-datepicker'

interface DatePickerProps extends ModernDatepickerProps {}

export const DatePicker = ({ options, ...props }: DatePickerProps) => {
	const { t } = useTranslation()
	const primaryColor = useTheme().primary

	const configs = useMemo(() => {
		return {
			dayNames: [
				'COMMON_SUNDAY',
				'COMMON_MONDAY',
				'COMMON_TUESDAY',
				'COMMON_WEDNESDAY',
				'COMMON_THURSDAY',
				'COMMON_FRIDAY',
				'COMMON_SATURDAY',
			].map(item => t(item)),
			dayNamesShort: [
				'COMMON_SU',
				'COMMON_MO',
				'COMMON_TU',
				'COMMON_WE',
				'COMMON_TH',
				'COMMON_FR',
				'COMMON_SA',
			].map(item => t(item)),
			monthNames: [
				'COMMON_JANUARY',
				'COMMON_FEBRUARY',
				'COMMON_MARCH',
				'COMMON_APRIL',
				'COMMON_MAY',
				'COMMON_JUNE',
				'COMMON_JULY',
				'COMMON_AUGUST',
				'COMMON_SEPTEMBER',
				'COMMON_OCTOBER',
				'COMMON_NOVEMBER',
				'COMMON_DECEMBER',
			].map(item => t(item)),
			hour: t('COMMON_HOUR'),
			minute: t('COMMON_MINUTE'),
			timeSelect: t('COMMON_SELECT'),
			timeClose: t('COMMON_CLOSE'),
		}
	}, [t])

	return (
		<ModernDatePicker
			// @ts-ignore
			configs={configs}
			options={{
				mainColor: primaryColor,
				backgroundColor: 'transparent',
				...options,
			}}
			{...props}
		/>
	)
}
