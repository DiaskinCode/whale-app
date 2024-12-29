import { StackHeaderProps } from '@react-navigation/stack'
import { BackButton } from './BackButton'
import { Header } from './Header'
import { HeaderTitle } from './HeaderTitle'

interface DefaultHeaderProps extends StackHeaderProps {}

export const DefaultHeader = ({ options }: DefaultHeaderProps) => {
	return (
		<Header
			left={<BackButton />}
			center={<HeaderTitle>{options.title}</HeaderTitle>}
		/>
	)
}
