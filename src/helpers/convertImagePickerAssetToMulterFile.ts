import * as FileSystem from 'expo-file-system'
import { ImagePickerAsset } from 'expo-image-picker'

export async function convertExpoAssetToMulterFile(
	asset: ImagePickerAsset,
	fieldname: string = 'file'
) {
	const fileInfo = await FileSystem.getInfoAsync(asset.uri)

	if (!fileInfo.exists) {
		throw new Error('File does not exist')
	}

	const response = await fetch(asset.uri)
	const blob = await response.blob()

	return {
		fieldname: fieldname,
		originalname: asset.fileName,
		encoding: '7bit',
		mimetype: asset.mimeType,
		size: fileInfo.size,
		buffer: blob,
	}
}
