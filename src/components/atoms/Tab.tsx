import { useTheme } from '@/src/hooks/useTheme'
import { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SelectButton } from './SelectButton'

interface TabProps {
	activeTab: number
	tabs: ReactNode[]
	children: ReactNode[]
	onSelectTab: (index: number) => void
}

export const Tab = ({ activeTab, tabs, children, onSelectTab }: TabProps) => {
	const primaryColor = useTheme().primary

	return (
		<View style={styles.container}>
			<View style={styles.tab}>
				{tabs.map((tab, index) => (
					<SelectButton
						key={index}
						style={styles.tabItem}
						isActive={activeTab === index}
						onPress={() => onSelectTab(index)}
					>
						<Text
							style={[
								styles.tabText,
								{ color: activeTab === index ? primaryColor : '#aaa' },
							]}
						>
							{tab}
						</Text>
					</SelectButton>
				))}
			</View>
			{children[activeTab]}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
	tab: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 8,
	},
	tabItem: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 12,
	},
	tabText: {
		fontSize: 16,
		fontWeight: '500',
	},
})
