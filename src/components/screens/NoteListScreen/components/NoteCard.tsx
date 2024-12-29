import { Button } from '@/src/components/atoms/Button'
import {
	CardItem,
	CardItemDescription,
	CardItemTitle,
} from '@/src/components/atoms/CardItem'
import { TouchableButton } from '@/src/components/atoms/TouchableButton'
import { useTheme } from '@/src/hooks/useTheme'
import { TNoteEntity } from '@/src/types/api'
import { AntDesign } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { format } from 'date-fns';

interface NoteCardProps {
	note: TNoteEntity
	onRoute: () => void
	onDelete: () => void
}

export const NoteCard = ({ note, onRoute, onDelete }: NoteCardProps) => {
	const primaryColor = useTheme().primary
	const redColor = useTheme().red
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={{ width: 25 }} />
				<View style={{ flex: 1 }}>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 16,
							fontWeight: '600',
							color: primaryColor,
						}}
					>
						{t('NOTE_ITEM_TITLE')}
					</Text>
				</View>
				<View
					style={{
						width: 25,
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}
				>
					<TouchableButton onPress={onDelete}>
						<AntDesign name='delete' size={24} color={redColor} />
					</TouchableButton>
				</View>
			</View>
			<View style={styles.content}>
				{note.title && (
					<CardItem
						title={<CardItemTitle>{t('NOTE_ITEM_TITLE')}:</CardItemTitle>}
						description={<CardItemDescription>{note.title}</CardItemDescription>}
					/>
				)}
				{note.tags.length > 0 && (
					<CardItem
						title={<CardItemTitle>{t('NOTE_ITEM_TAGS')}:</CardItemTitle>}
						description={
							<CardItemDescription>
								{note.tags.map((tag, index, arr) => (
									<Text key={tag.id}>
										{tag.name}
										{index !== arr.length - 1 ? ', ' : ''}
									</Text>
								))}
							</CardItemDescription>
						}
					/>
				)}
				{note.content && (
					<CardItem
						title={<CardItemTitle>{t('NOTE_ITEM_CONTENT')}:</CardItemTitle>}
						description={
							<CardItemDescription>{note.content}</CardItemDescription>
						}
					/>
				)}
				{note.createdAt && (
					<CardItem
						title={<CardItemTitle>{t('NOTE_ITEM_CREATED_AT')}:</CardItemTitle>}
						description={
							<CardItemDescription>
								{format(new Date(note.createdAt), 'HH:mm  |  dd-MM')}
							</CardItemDescription>
						}
					/>
				)}
			</View>

			<View>
				<Button variantStyle='outline' variantSize='sm' onPress={onRoute}>
					<View style={styles.button}>
						<Text style={[styles.buttonText, { color: primaryColor }]}>
							{t('COMMON_VIEW')}
						</Text>
						<AntDesign name='right' size={18} color={primaryColor} />
					</View>
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 20,
		paddingVertical: 16,
		paddingHorizontal: 13,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 8,
	},
	content: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
	},
})
