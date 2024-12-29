import { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'

import {
	MedicationReceptionDaysEnum,
	MedicationReceptionStatusEnum,
} from '@/src/constants/api'
import { medicationPlanApi } from '@/src/services/api/medication-plan'
import { medicationApi } from '@/src/services/api/medication'
import {
	TMedicationPlanEntity,
	TMedicationPlanReceptionEntity,
} from '@/src/types/api'
import { AntDesign } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { endOfDay, format, isSameDay, startOfDay } from 'date-fns'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'

export const MonitoringReportScreen = () => {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { params } = useRoute()
	const { t } = useTranslation()

	const from = new Date((params as any).from)
	const to = new Date((params as any).to)

	const medicationPlanListQuery = useQuery({
		queryKey: ['medicationPlanList', from, to],
		queryFn: async () => {
			const res = await medicationPlanApi.getUserAll({
				pagination: {
					page: 1,
					pageSize: 10,
				},
				search: {
					startAt: {
						from: startOfDay(from).toISOString(),
						to: endOfDay(to).toISOString(),
					},
				},
				relations: {
					receptions: true,
					medication: true,
				},
			})
			return res
		},
	})

	

	const getChartUrl = (
		medicationPlanReceptionList: TMedicationPlanReceptionEntity[]
	) => {
		const chartConfig = {
			type: 'bar',
			data: {
				labels: [
					t('COMMON_MONDAY'),
					t('COMMON_TUESDAY'),
					t('COMMON_WEDNESDAY'),
					t('COMMON_THURSDAY'),
					t('COMMON_FRIDAY'),
					t('COMMON_SATURDAY'),
					t('COMMON_SUNDAY'),
				],
				datasets: [
					{
						data: Object.values(MedicationReceptionDaysEnum).map(
							([key, value]) => {
								const receptions = medicationPlanReceptionList.filter(
									reception => isSameDay(reception.date, value)
								)
								return receptions.length
							}
						),
						backgroundColor: [
							'#666DFB',
							'#E247C0',
							'#FE6963',
							'#B531F2',
							'#666DFB',
							'#E247C0',
							'#FE6963',
						],
						borderColor: [],
						borderWidth: 1,
					},
				],
			},
			options: {
				legend: {
					display: false,
				},
				scales: {
					yAxes: [
						{
							ticks: {
								min: 0,
								max: 100,
							},
						},
					],
				},
			},
		}

		return `https://quickchart.io/chart?c=${encodeURIComponent(
			JSON.stringify(chartConfig)
		)}`
	}

	const getMedicationPlanHtml = (medicationPlan: TMedicationPlanEntity) => {
		const acceptedMedicationPlanReception = medicationPlan.receptions.filter(
			reception => reception.status === MedicationReceptionStatusEnum.Completed
		)
		const chartUrl = getChartUrl(medicationPlan.receptions)

		return `
		<div style="margin-top:30px;">
			<div style="display:flex;flex-direction:row;gap:20px;">
				<div>
					<h6 style="margin:0;padding:0;font-size:20px;font-weight:600;">
					${medicationPlan.medication.title}
					</h6>
					<div style="display:flex;flex-direction:row;gap:10px;">
					<span>
					${t('MEDICATION_FORM_START_AT_LABEL')}:
					</span>
					<span>
					${format(medicationPlan.startAt, 'dd.MM.yyyy')}
					</span>
					</div>
					<div style="display:flex;flex-direction:row;gap:10px;">
					<span>
					${t('MEDICATION_FORM_DURATION_LABEL')}:
					</span>
					<span>
						${medicationPlan.duration} ${t(`COMMON_${medicationPlan.durationValue}`)}
					</span>
					</div>
					<div style="display:flex;flex-direction:row;gap:10px;">
					<span>
					${t('MEDICATION_FORM_DOSE_LABEL')}:
					</span>
					<span>
					${medicationPlan.dose} ${t(`COMMON_${medicationPlan.doseValue}`)}
					</span>
					</div>
					</div>
					<div style="width:70px;height:30px;display:flex;justify-content:center;align-items:center;background:#aaa;padding:10px;border-radius:10px;">
					${acceptedMedicationPlanReception.length} ${t('COMMON_OF')} ${
			medicationPlan.receptions.length
		}
				</div>
			</div>
			<img src="${chartUrl}" style="width: 100%;margin-top: 20px;" />
		</div>
		`
	}

	const generatePdf = async (medicationPlanList: TMedicationPlanEntity[]) => {
		const medicationPlanReceptionList = medicationPlanList.reduce(
		  (acc, item) => [...acc, ...item.receptions],
		  [] as TMedicationPlanReceptionEntity[]
		);
		
		const receptionsCount = medicationPlanReceptionList.length;
		const acceptedReceptionsCount = medicationPlanReceptionList.filter(
		  reception => reception.status === MedicationReceptionStatusEnum.Completed
		).length;
		const rejectedReceptionsCount = medicationPlanReceptionList.filter(
		  reception => reception.status === MedicationReceptionStatusEnum.Skipped
		).length;
		
		// Функция для отображения мини-календаря
		const renderMiniCalendar = (date: Date) => {
		  const day = format(date, 'd');
		  return `<span style="display:inline-block;width:20px;height:20px;background-color:#ddd;border-radius:50%;text-align:center;line-height:20px;">${day}</span>`;
		};
		
		const renderMedicationReceptions = (receptions: TMedicationPlanReceptionEntity[]) => {
		  // Sort receptions by date in ascending order
		  const sortedReceptions = receptions.sort((a, b) => new Date(a.date) - new Date(b.date));
		  
		  return sortedReceptions.map((reception) => {
			const statusColor = reception.status === MedicationReceptionStatusEnum.Completed
			  ? 'green'
			  : reception.status === MedicationReceptionStatusEnum.Skipped
			  ? '#FE6963'
			  : '#FE6963';
			const receptionDate = format(new Date(reception.date), 'dd');
			return `
			  <button style="display:block; padding:5px 10px; border-radius:5px; border:2.5px solid ${statusColor}">
				<p style="font-size:18px;font-weight:bold;line-height:0px; color:${statusColor};">${receptionDate}</p>
			  </button>
			`;
		  }).join('');
		};
	  
		// Функция для рендеринга календаря с суммой выпитых витаминов
		const renderCalendarWithStats = (receptions: TMedicationPlanReceptionEntity[]) => {
		  const acceptedDates = receptions.filter(
			reception => reception.status === MedicationReceptionStatusEnum.Completed
		  ).map(reception => new Date(reception.date));
	  
		  const totalReceptions = receptions.length;
		  const totalAccepted = acceptedDates.length;
	  
		  // Статистика по количеству
		  const stats = `${totalAccepted} из ${totalReceptions} витаминов принято`;
	  
		  return `
			<div style="margin-top:20px;">
			  <div style="margin-top:10px;font-weight:bold;font-size:20px;">
				${stats} 
			  </div>
			</div>
		  `;
		};
	  
		const html = `
		  <html>
			<head>
			  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
			</head>
			<body style="padding:30px;padding-top:100px;border-radius: 10px;color:#333; font-family:'Arial';">
			  <div style="display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start;">
				<h1 style="font-size:20px;font-weight:bold;">Мониторинг показателей</h1>
				<span>за период 31.09.2023 - 24.01.2024</span>
			  </div>
			  <div style="display:flex;flex-direction:row;gap:40px;margin-top:5px;">
				<div style="display:flex;flex-direction:row;align-items:center;gap:10px;">
					<div>Приемов</div>
					<div>${Math.round((acceptedReceptionsCount / receptionsCount) * 100)}%</div>
				</div>
				<div style="display:flex;flex-direction:row;align-items:center;gap:10px;">
					<div>Приемов пропущенно</div>
					<div>${Math.round((rejectedReceptionsCount / receptionsCount) * 100)}%</div>
				</div>
			  </div>
			  ${medicationPlanList.map(item => {
				return `
				  <div style="margin-top:30px;">
					<h2>${item.medication.title}</h2>
					<p style="font-size: 18px; font-weight: medium; color: #333;">
					  Начало приема: ${format(new Date(item.medication.createdAt), 'dd.MM.yyyy')}
					</p>

					<p style="font-size: 18px; font-weight: medium; color: #333;">
					  Дозировка: ${item.dose} ${t(`COMMON_${item.doseValue}`)}
					</p>
					<p style="font-size: 18px; font-weight: medium; color: #333;">
					  Начало приема: ${format(new Date(item.startAt), 'dd.MM.yyyy')}
					</p>
					<p style="font-size: 18px; font-weight: medium; color: #333;">
					  Частота приема: ${item.days.map(day => t(`COMMON_${day}`)).join(', ')}
					</p>
					<p style="font-size: 18px; font-weight: medium; color: #333;">
					  Продолжительность приема: ${item.duration} ${t(`COMMON_${item.durationValue}`)}
					</p>
					<div style="display:flex;flex-direction:row;align-items:center;gap:30px;margin-top:20px;">
						<div style="display:flex;flex-direction:row;align-items:center;gap:10px;">
							<div style="width:10px;height:10px;border: 5px solid #FE6963;background-color:transparent;border-radius:10px;"></div>
							Не принято
						</div>
						<div style="display:flex;flex-direction:row;align-items:center;gap:10px;">
							<div style="width:10px;height:10px;border: 5px solid green;background-color:transparent;border-radius:10px;"></div>
							Принято
						</div>
					</div>
					${renderCalendarWithStats(item.receptions)}
					<div style="display:flex; flex-direction:row; margin-top:10px; flex-wrap:wrap;gap:5px;width:300px;">
					  ${renderMedicationReceptions(item.receptions)}
					</div>
				  </div>
				`;
			  }).join('')}
			</body>
		  </html>
		`;
	  
		const { uri } = await Print.printToFileAsync({ html });
		return uri;
	  };
	  

	useEffect(() => {
		;(async () => {
			if (!medicationPlanListQuery.data?.records?.length) return

			let uri: string | undefined
			try {
				setIsLoading(true)
				try {
					uri = await generatePdf(medicationPlanListQuery.data.records)
					setPdfUrl(uri)
				} catch (error) {
					console.log(error)
				} finally {
					setIsLoading(false)
				}

				if (!uri) return
				await Sharing.shareAsync(uri, {
					UTI: '.pdf',
					mimeType: 'application/pdf',
				})
			} catch (error) {}
		})()
	}, [medicationPlanListQuery.data, t])

	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<View style={styles.container}>
				{isLoading ? (
					<View
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<AntDesign name='loading1' size={24} color='#ccc' />
					</View>
				) : (
					pdfUrl && (
						<WebView
							style={styles.content}
							source={{ uri: pdfUrl }}
							originWhitelist={['*']}
						/>
					)
				)}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	content: {
		flex: 1,
	},
})
