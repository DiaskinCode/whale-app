import en from 'date-fns/locale/en-US'
import kz from 'date-fns/locale/kk'
import ru from 'date-fns/locale/ru'
import { LangsEnum } from './api'

export const DateLocales = {
	[LangsEnum.En]: en,
	[LangsEnum.Ru]: ru,
	[LangsEnum.Kz]: kz,
}
