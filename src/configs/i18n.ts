import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'
import en from '../../assets/translations/en.json'
import kz from '../../assets/translations/kz.json'
import ru from '../../assets/translations/ru.json'
import { LangsEnum } from '../constants/api'

const resources = {
	[LangsEnum.Kz]: {
		translation: kz,
	},
	[LangsEnum.Ru]: {
		translation: ru,
	},
	[LangsEnum.En]: {
		translation: en,
	},
}

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	resources,
	fallbackLng: LangsEnum.Ru,
	interpolation: {
		escapeValue: false,
	},
})

export default i18n
