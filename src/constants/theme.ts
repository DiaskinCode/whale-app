import { TColor, TColorTypes } from '@/src/types/color'

const TintColors = {
	light: '#0a7ea4',
	dark: '#fff',
}

export const Colors: Record<TColorTypes, TColor> = {
	light: {
		primary: '#666DFB',
		secondary: '#A7ADE7',
		green: '#30CE49',
		red: '#EF4444',
		black: '#000',
		text: '#333333',
		background: '#fff',
		tint: TintColors.light,
		icon: '#687076',
		tabIconDefault: '#687076',
		tabIconSelected: TintColors.light,
	},
	dark: {
		primary: '#666DFB',
		secondary: '#A7ADE7',
		green: '#30CE49',
		red: '#EF4444',
		black: '#000',
		text: '#ECEDEE',
		background: '#151718',
		tint: TintColors.dark,
		icon: '#9BA1A6',
		tabIconDefault: '#9BA1A6',
		tabIconSelected: TintColors.dark,
	},
}
