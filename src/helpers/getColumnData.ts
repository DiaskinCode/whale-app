export function getColumnData<T>(data: T[], columnCount: number) {
	const cellsCount = Math.ceil(data.length / columnCount) * columnCount

	return Array.from({ length: cellsCount }).map(
		(_, index) => data[index] ?? undefined
	)
}
