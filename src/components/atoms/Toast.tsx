import { ComponentProps } from 'react'
import { BaseToast } from 'react-native-toast-message'
interface ToastProps extends ComponentProps<typeof BaseToast> {}

export const Toast = (props: ToastProps) => {
	return <BaseToast {...props} />
}
