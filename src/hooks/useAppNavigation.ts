import { TRootStackParamList } from '@/src/types/navigation'
import { NavigationProp, useNavigation } from '@react-navigation/native'

export type AppNavigationProp = NavigationProp<TRootStackParamList> & {
	push: NavigationProp<TRootStackParamList>['navigate']
}

export const useAppNavigation = () => {
	return useNavigation<AppNavigationProp>()
}
