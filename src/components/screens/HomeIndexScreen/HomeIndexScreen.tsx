import { CardLinkButton } from '@/src/components/atoms/CardLinkButton';
import { LockMaskView } from '@/src/components/atoms/LockMaskView';
import { sessionStore } from '@/src/stores/session';
import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { accountApi } from '@/src/services/api/account'
import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { healthStateApi } from '@/src/services/api/health-state';
import { medicationPlanReceptionApi } from '@/src/services/api/medication-plan-reception';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { logEvent } from '@/amplitude'
import {
    eachDayOfInterval,
    endOfDay,
    endOfWeek,
    isSameDay,
    startOfDay,
    startOfWeek,
} from 'date-fns';
import { observer } from 'mobx-react-lite';
import { useMemo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { BaseButtonVariantColor } from '../../atoms/BaseButton';
import { IconButton } from '../../atoms/IconButton';
import { CalendarDayCard } from '../../molecules/CalendarDayCard';
import { AuthBottomSheet } from './components/AuthBottomSheet';
import { TMedicationPlanReceptionEntity, TResponse } from '@/src/types/api';
import Purchases from "react-native-purchases";


export const HomeIndexScreen = observer(() => {
    const { isAuth,account } = sessionStore;
    const navigation = useAppNavigation();
    const { t } = useTranslation();


    const currentWeekDays = useMemo(() => {
        return eachDayOfInterval({
            start: startOfWeek(new Date(), { weekStartsOn: 1 }),
            end: endOfWeek(new Date(), { weekStartsOn: 1 }),
        });
    }, []);
    const { logoutAction } = sessionStore

    const folders = useMemo(
        () => [
            {
                variantColor: 'primary',
                title: t('HOME_INDEX_FOLDER_TITLE_1'),
                icon: <Ionicons name='folder-outline' size={24} color='#fff' />,
                route: () => navigation.push('ConsultList'),
            },
            {
                variantColor: 'green',
                title: t('HOME_INDEX_FOLDER_TITLE_2'),
                icon: <AntDesign name='file1' size={24} color='#fff' />,
                route: () => navigation.push('NoteList'),
            },
            {
                variantColor: 'orange',
                title: t('HOME_INDEX_FOLDER_TITLE_3'),
                icon: <AntDesign name='hearto' size={24} color='#fff' />,
                route: () => navigation.push('Monitoring'),
            },
        ],
        [t]
    );

    const handleLogout = async () => {
		await logoutAction()
	}

    const medicationPlanReceptionQuery = useQuery<TResponse<TMedicationPlanReceptionEntity[]>, Error>({
        queryKey: ['medicationPlanReceptionQuery'],
        queryFn: async () => {
            try {
                const res = await medicationPlanReceptionApi.getUserClosest();
                console.log("Medication Plan Reception Query Data:", res);
                return res;
            } catch (error: any) {
                if (error.response?.status === 401) {
                    handleLogout();
                }
                throw error; 
            }
        },
    });


    const checkSubscriptionStatus = async (accountId: string): Promise<boolean> => {
        try {
            return await checkBackendSubscription(accountId);
        } catch (error) {
            console.error("Error checking subscription status:", error);
            return false;
        }
    };

    const checkBackendSubscription = async (accountId: string): Promise<boolean> => {
        try {
            const response = await accountApi.getSubscriptionStatus(accountId);
            if (response?.subscription?.hasActiveSubscription === true) {
                return true;
            } else {
                console.error("Unexpected response structure:", response);
                return false;
            }
        } catch (error) {
            console.error("Error checking backend subscription:", error);
            return false;
        }
    };

    const checkIosSubscription = async (): Promise<boolean> => {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            console.log("RevenueCat Customer Info:", customerInfo);

            return customerInfo?.activeSubscriptions?.length > 0;
        } catch (error) {
            console.error("Error checking iOS subscription:", error);
            return false;
        }
    };

    const checkSubscriptionAndNavigate = async (accountId?: string) => {
        try {
            let isActive = false;

            if (Platform.OS === "ios") {
                isActive = await checkIosSubscription();
            } else if (Platform.OS === "android" && accountId) {
                isActive = await checkSubscriptionStatus(accountId);
            }

            console.log("Subscription Active:", isActive);

            if (!isActive) {
                console.log("Subscription has ended. Redirecting...");
                navigation.reset({
                    index: 0,
                    routes: [{ name: "SubscriptionEnded" }],
                });
            }
        } catch (error) {
            console.error("Error in subscription check:", error);
        }
    };

    useEffect(() => {
        logEvent("Home screen viewed");

        if (account?.id) {
            console.log("Checking subscription for:", account.id);
            checkSubscriptionAndNavigate(account.id);
        }
    }, [account?.id]);

    
    const [processedItems, setProcessedItems] = useState<string[]>([]);
    const [acceptedIds, setAcceptedIds] = useState<string[]>([]); 

    const handleAccept = async (id: string) => {
        try {
            await medicationPlanReceptionApi.patchUserOne(id, { status: "COMPLETED" });
            setAcceptedIds((prevAcceptedIds) => [...prevAcceptedIds, id]);
            console.log('Accepted:', id);
        } catch (error) {
            console.error('Error accepting medication plan reception:', error);
        }
    };

    const [skippedIds, setSkippedIds] = useState<string[]>([]);

    const handleSkip = async (id: string) => {
        try {
            await medicationPlanReceptionApi.patchUserOne(id, { status: "SKIPPED" });
            // Add the id to the skippedIds array
            setSkippedIds((prevSkippedIds) => [...prevSkippedIds, id]);
            console.log('Skipped:', id);
        } catch (error) {
            console.error('Error skipping medication plan reception:', error);
        }
    };


    const handleAcceptWithMessage = async (id: string) => {
        await handleAccept(id);
        setProcessedItems((prev) => [...prev, id]);
    
        setTimeout(() => {
            medicationPlanReceptionQuery.refetch(); // This will refetch the updated list
        }, 1000); 
    };
    
    const handleSkipWithMessage = async (id: string) => {
        await handleSkip(id);
        setProcessedItems((prev) => [...prev, id]);
    
        setTimeout(() => {
            medicationPlanReceptionQuery.refetch(); // This will refetch the updated list
        }, 1000);
    };
    
    
    

    const medicationPlanReceptionListQuery = useQuery({
        queryKey: ['medicationPlanReceptionLustQuery', currentWeekDays],
        queryFn: async () => {
            const res = await medicationPlanReceptionApi.getUserAll({
                search: {
                    date: {
                        from: startOfDay(currentWeekDays[0]).toISOString(),
                        to: endOfDay(
                            currentWeekDays[currentWeekDays.length - 1]
                        ).toISOString(),
                    },
                },
                relations: {
                    medicationPlan: {
                        medication: true,
                    },
                },
            });

            return res;
        },
    });

    const healthStateListQuery = useQuery({
        queryKey: ['healthStateList', currentWeekDays],
        queryFn: async () => {
            const res = await healthStateApi.getUserAll({
                search: {
                    date: {
                        from: startOfDay(currentWeekDays[0]).toISOString(),
                        to: endOfDay(
                            currentWeekDays[currentWeekDays.length - 1]
                        ).toISOString(),
                    },
                },
            });

            return res;
        },
    });

    const data = medicationPlanReceptionQuery.data;
    

    return (
        <>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <View style={styles.days}>
                        {currentWeekDays.map(date => {
                            const receptions = medicationPlanReceptionListQuery.data
                                ? medicationPlanReceptionListQuery.data.records.filter(
                                    reception => isSameDay(reception.date, date)
                                )
                                : [];

                            const healthState = healthStateListQuery.data?.records.find(
                                healthState => isSameDay(healthState.date, date)
                            );

                            return (
                                <LockMaskView key={date.toString()} disabled={!isAuth}>
                                    <CalendarDayCard
                                        date={date}
                                        receptions={receptions}
                                        healthState={healthState?.state ?? undefined}
                                    />
                                </LockMaskView>
                            );
                        })}
                    </View>
                    
                    {data && data.length > 0 ? (
                        data.length === 1 ? (
                            <View key={data[0].id} style={styles.card}>
                                {processedItems.includes(data[0].id) ? (
                                    <Text style={styles.successMessage}>Ответ засчитан!</Text>
                                ) : (
                                    <>
                                        <Text style={styles.title}>{data[0].medicationPlan.medication.title}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.details}>
                                                Доза: {data[0].medicationPlan.dose} {data[0].medicationPlan.doseValue}
                                            </Text>
                                            <Text style={styles.details}>
                                                Время приема: {data[0].medicationPlan.times.join(', ')}
                                            </Text>
                                        </View>
                                        <Text style={{ color: data[0].status === 'PENDING' ? 'orange' : 'green', fontSize: 18, fontWeight: '500', marginTop: 4 }}>
                                            {data[0].status === 'PENDING' ? 'В ожидании' : 'Принято'}
                                        </Text>
                                        <View style={styles.actions}>
                                            <IconButton
                                                variantColor="green"
                                                style={styles.halfButton}
                                                onPress={() => handleAcceptWithMessage(data[0].id)}
                                            >
                                                <Text style={styles.buttonText}>Принять</Text>
                                            </IconButton>
                                            <IconButton
                                                variantColor="red"
                                                style={styles.halfButton}
                                                onPress={() => handleSkipWithMessage(data[0].id)}
                                            >
                                                <Text style={styles.buttonText}>Пропустить</Text>
                                            </IconButton>
                                        </View>
                                    </>
                                )}
                            </View>
                        ) : (
                            // Render multiple items with ScrollView
                            <ScrollView style={{ height: 'auto', maxHeight: 180, borderRadius: 15 }}>
                                {data.map((item) => (
                                    <View key={item.id} style={styles.multipleCard}>
                                        {processedItems.includes(item.id) ? (
                                            <Text style={styles.successMessage}>Ответ засчитан!</Text>
                                        ) : (
                                            <>
                                                <Text style={styles.multipleTitle}>{item.medicationPlan.medication.title}</Text>
                                                <View style={styles.multipleActions}>
                                                    <IconButton
                                                        variantColor="green"
                                                        style={styles.multipleHalfButton}
                                                        onPress={() => handleAcceptWithMessage(item.id)}
                                                    >
                                                        <Text style={styles.multipleButtonText}>Принять</Text>
                                                    </IconButton>
                                                    <IconButton
                                                        variantColor="red"
                                                        style={styles.multipleHalfButton}
                                                        onPress={() => handleSkipWithMessage(item.id)}
                                                    >
                                                        <Text style={styles.multipleButtonText}>Пропустить</Text>
                                                    </IconButton>
                                                </View>
                                            </>
                                        )}
                                    </View>
                                ))}
                            </ScrollView>
                        )
                    ) : null}

                    <View style={styles.folders}>
                        {folders.map((folder, index) => (
                            <LockMaskView key={index} disabled={!isAuth}>
                                <CardLinkButton
                                    variantColor={folder.variantColor as BaseButtonVariantColor}
                                    icon={folder.icon}
                                    title={
                                        <Text style={{ fontWeight: '600', color: '#fff' }}>
                                            {folder.title}
                                        </Text>
                                    }
                                    onPress={folder.route}
                                />
                            </LockMaskView>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <AuthBottomSheet />
        </>
    );
});

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        paddingVertical: 16,
    },
    days: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    folders: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom:15,
    },
    multipleCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
		marginBottom:10
    },
    multipleTitle: {
        fontSize: 15,
        fontWeight: '500',
    },
    details: {
        marginVertical: 10,
		marginRight: 10,
		padding:10,
		borderRadius:10,
		overflow:'hidden',
		backgroundColor:'#F2F2F2',
		fontWeight:'500',
		color:'#666'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    multipleActions: {
        width:'60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfButton: {
		marginTop:10,
        flex: 1,
		height:45,
        marginHorizontal:4,
    },
    buttonText: {
        textAlign: 'center',
		color:'#fff',
        fontWeight: '600',
		fontSize:17,
    },
    multipleHalfButton: {
        flex: 1,
		height:35,
        marginHorizontal:4,
    },
    multipleButtonText: {
        textAlign: 'center',
		color:'#fff',
        fontWeight: '600',
		fontSize:14,
    },
    successMessage: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

