import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { Ionicons } from '@expo/vector-icons'
import { TouchableButton } from '../atoms/TouchableButton'

export const BackButton = () => {
	const navigation = useAppNavigation()

	const handleBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack()
		}
	}

	return (
		<TouchableButton onPress={handleBack}>
			<Ionicons name='chevron-back' size={24} color='#000' />
		</TouchableButton>
	)
}
