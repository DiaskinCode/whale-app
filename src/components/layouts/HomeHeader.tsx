import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useTheme } from '@/src/hooks/useTheme'

import { sessionStore } from '@/src/stores/session'
import { AntDesign } from '@expo/vector-icons'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { observer } from 'mobx-react-lite'
import { TouchableButton } from '../atoms/TouchableButton'
import { Header } from './Header'
import { HeaderTitle } from './HeaderTitle'

interface HomeHeaderProps extends BottomTabHeaderProps {}

export const HomeHeader = observer(({ options }: HomeHeaderProps) => {
	const { isAuth } = sessionStore
	const primaryColor = useTheme().primary
	const navigation = useAppNavigation()

	return (
		<Header
			left={
				<TouchableButton disabled={!isAuth}>
					<AntDesign name='questioncircleo' size={24} color={primaryColor} />
				</TouchableButton>
			}
			center={<HeaderTitle>{options.title}</HeaderTitle>}
			right={
				<TouchableButton
					disabled={!isAuth}
					onPress={() => navigation.push('CreateUserMedication')}
				>
					<AntDesign name='pluscircleo' size={24} color={primaryColor} />
				</TouchableButton>
			}
		/>
	)
})
