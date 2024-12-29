export async function getBlobParts(blob: Blob) {
	const arrayBuffer = await blob.arrayBuffer()
	return new Uint8Array(arrayBuffer)
}
