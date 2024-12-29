import { Colors } from '@/src/constants/theme'
import { useColorScheme } from './useColorScheme'

export function useTheme() {
	const colorsScheme = useColorScheme()
	const theme = colorsScheme ?? 'light'

	return Colors[theme]
}
