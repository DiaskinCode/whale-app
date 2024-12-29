import { Image, ImageProps } from 'react-native'

interface AvatarProps extends Omit<ImageProps, 'width' | 'height'> {
	size?: number
}

export const Avatar = ({ size = 80, ...props }: AvatarProps) => {
	return (
		<Image
			width={size}
			height={size}
			borderRadius={size / 2}
			resizeMode='contain'
			{...props}
		/>
	)
}
