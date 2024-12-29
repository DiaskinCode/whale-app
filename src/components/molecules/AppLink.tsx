import { TRootStackParamList } from '@/src/types/navigation'
import { Link } from '@react-navigation/native'
import { ComponentProps } from 'react'

interface AppLinkProps extends Omit<ComponentProps<typeof Link<any>>, 'to'> {
	to: keyof TRootStackParamList
}

export const AppLink = ({ to, ...props }: AppLinkProps) => {
	return <Link to={to} {...props} />
}
