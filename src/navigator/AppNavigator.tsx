import { AuthSignUpScreen } from '@/src/components/screens/AuthSignUpScreen/AuthSignUpScreen'
import { AuthForgotPasswordScreen } from '@/src/components/screens/AuthForgotPasswordScreen/AuthForgotPasswordScreen'
import { AuthResetPasswordScreen } from '@/src/components/screens/AuthResetPasswordScreen/AuthResetPasswordScreen'
import HomeCalendarScreen from '@/src/components/screens/HomeCalendarScreen'
import HomeIndexScreen from '@/src/components/screens/HomeIndexScreen'
import HomeUserProfileScreen from '@/src/components/screens/HomeUserProfileScreen'
import * as Linking from 'expo-linking'

import WelcomeScreen from '@/src/components/screens/WelcomeScreen'
import { THomeTabParamList, TRootStackParamList } from '@/src/types/navigation'
import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	NavigationContainer,
	useNavigationContainerRef,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useUnit } from 'effector-react'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableButton } from '../components/atoms/TouchableButton'
import { DefaultHeader } from '../components/layouts/DefaultHeader'
import { HomeHeader } from '../components/layouts/HomeHeader'
import { AuthSignInScreen } from '../components/screens/AuthSignInScreen/AuthSignInScreen'
import { EditUserProfileScreen } from '../components/screens/EditUserProfileScreen/EditUserProfileScreen'

import { AvatarListScreen } from '../components/screens/AvatarListScreen/AvatarListScreen'

import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { ConsultItemScreen } from '../components/screens/ConsultItemScreen/ConsultItemScreen'
import { ConsultListScreen } from '../components/screens/ConsultListScreen/ConsultListScreen'
import { CreateConsultScreen } from '../components/screens/CreateConsultScreen/CreateConsultScreen'
import { CreateNoteScreen } from '../components/screens/CreateNoteScreen/CreateNoteScreen'
import { CreateUserMedicationScreen } from '../components/screens/CreateUserMedicationScreen/CreateUserMedicationScreen'
import { CreateOwnUserMedicationScreen } from '../components/screens/CreateOwnUserMedicationScreen/CreateOwnUserMedicationScreen'
import { EditUserMedicationScreen } from '../components/screens/EditUserMedicationScreen/EditUserMedicationScreen'
import { MonitoringReportScreen } from '../components/screens/MonitoringReportScreen/MonitoringReportScreen'
import { MonitoringScreen } from '../components/screens/MonitoringScreen/MonitoringScreen'
import { SubscriptionScreen } from '../components/screens/SubscriptionScreen/SubscriptionScreen'
import { PayScreen } from '../components/screens/SubscriptionScreen/PayScreen'
import { SubscriptionEndedScreen } from '../components/screens/SubscriptionEndedScreen/SubscriptionEndedScreen'
import { NoteItemScreen } from '../components/screens/NoteItemScreen/NoteItemScreen'
import { NoteListScreen } from '../components/screens/NoteListScreen/NoteListScreen'
import { PurposeListScreen } from '../components/screens/PurposeListScreen/PurposeListScreen'
import { UserMedicationListScreen } from '../components/screens/UserMedicationListScreen/UserMedicationListScreen'
import { useTheme } from '../hooks/useTheme'
import { $isHomeTabVisible } from '../stores/homeTab'
import { sessionStore } from '../stores/session'

const RootStack = createStackNavigator<TRootStackParamList>()
const HomeTab = createBottomTabNavigator<THomeTabParamList>()

const HomeNavigator = observer(() => {
	const { isAuth } = sessionStore
	const isHomeTabVisible = useUnit($isHomeTabVisible)
	const primaryColor = useTheme().primary
	const { bottom } = useSafeAreaInsets()
	const { t } = useTranslation()

	return (
		<HomeTab.Navigator
			initialRouteName='Index'
			screenOptions={{
				header: props => <HomeHeader {...props} />,
				tabBarButton: props => (
					<TouchableButton activeOpacity={0.5} {...props} />
				),
				tabBarShowLabel: false,
				tabBarInactiveTintColor: '#000',
				tabBarActiveTintColor: primaryColor,
				tabBarStyle: {
					display: !isAuth || !isHomeTabVisible ? 'none' : 'flex',
					paddingTop: 0,
					paddingBottom: bottom,
					height: bottom + 70,
				},
			}}
		>
			{isAuth ? (
				<>
					<HomeTab.Screen
						name='MedicationCalendar'
						component={HomeCalendarScreen}
						options={{
							title: t('HOME_CALENDAR_TITLE'),
							tabBarIcon: ({ size, color }) => (
								<AntDesign name='calendar' size={size} color={color} />
							),
						}}
					/>
					<HomeTab.Screen
						name='Index'
						component={HomeIndexScreen}
						options={{
							title: t('HOME_INDEX_TITLE'),
							tabBarIcon: ({ size, color }) => (
								<AntDesign name='home' size={size} color={color} />
							),
						}}
					/>
					<HomeTab.Screen
						name='UserProfile'
						component={HomeUserProfileScreen}
						options={{
							title: t('HOME_PROFILE_TITLE'),
							tabBarIcon: ({ size, color }) => (
								<AntDesign name='user' size={size} color={color} />
							),
						}}
					/>
				</>
			) : (
				<HomeTab.Screen
					name='Index'
					component={HomeIndexScreen}
					options={{
						title: t('HOME_INDEX_TITLE'),
						tabBarIcon: ({ size, color }) => (
							<AntDesign name='home' size={size} color={color} />
						),
					}}
				/>
			)}
		</HomeTab.Navigator>
	)
})

const prefix = Linking.createURL('/')

export const AppNavigator = observer(() => {
	const { isAuth } = sessionStore
	const navRef = useNavigationContainerRef<TRootStackParamList>()
	const { t } = useTranslation()

	return (
		<NavigationContainer
			ref={navRef}
			linking={{
				prefixes: [prefix],
				config: {
					screens: {
						Home: {
							path: 'home',
							screens: {
								Index: {
									path: 'index',
								},
							},
						},
					},
				},
			}}
		>
			<RootStack.Navigator initialRouteName={isAuth ? 'Home' : 'Welcome'}>
				<RootStack.Group screenOptions={{ headerShown: false }}>
					<RootStack.Screen name='Welcome' component={WelcomeScreen} />
					<RootStack.Screen name='Home' component={HomeNavigator} />
				</RootStack.Group>
				<RootStack.Group
					screenOptions={{
						header: DefaultHeader,
					}}
				>
					<RootStack.Screen
						name='SignIn'
						component={AuthSignInScreen}
						options={{ title: t('SIGNIN_TITLE') }}
					/>
					<RootStack.Screen
						name='SignUp'
						component={AuthSignUpScreen}
						options={{ title: t('SIGNUP_TITLE') }}
					/>
					<RootStack.Screen
						name='ForgotPassword'
						component={AuthForgotPasswordScreen}
						options={{ title: t('FORGOT_TITLE') }}
					/>
					<RootStack.Screen
						name='ResetPassword'
						component={AuthResetPasswordScreen}
						options={{ title: t('FORGOT_TITLE') }}
					/>
					<RootStack.Screen
						name='PurposeList'
						component={PurposeListScreen}
						options={{
							title: t('PURPOSE_LIST_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='AvatarList'
						component={AvatarListScreen}
						options={{
							title: t('AVATAR_LIST_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='EditUserProfile'
						component={EditUserProfileScreen}
						options={{
							title: t('EDIT_USER_PROFILE_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='CreateUserMedication'
						component={CreateUserMedicationScreen}
						options={{
							title: t('CREATE_USER_MEDICATION_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='CreateOwnUserMedication'
						component={CreateOwnUserMedicationScreen}
						options={{
							title: t('CREATE_USER_MEDICATION_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='EditUserMedication'
						component={EditUserMedicationScreen}
						options={{
							title: t('EDIT_USER_MEDICATION_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='UserMedicationList'
						component={UserMedicationListScreen}
						options={{
							title: t('MEDICATION_LIST_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='ConsultList'
						component={ConsultListScreen}
						options={{
							title: t('CONSULT_LIST_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='CreateConsult'
						component={CreateConsultScreen}
						options={{
							title: t('CREATE_CONSULT_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='ConsultItem'
						component={ConsultItemScreen}
						options={{
							title: t('CONSULT_ITEM_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='NoteList'
						component={NoteListScreen}
						options={{
							title: t('NOTE_LIST_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='CreateNote'
						component={CreateNoteScreen}
						options={{
							title: t('CREATE_NOTE_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='NoteItem'
						component={NoteItemScreen}
						options={{
							title: t('NOTE_ITEM_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='Monitoring'
						component={MonitoringScreen}
						options={{
							title: t('MONITORING_TITLE'),
						}}
					/>
					<RootStack.Screen
						name='Subscription'
						component={SubscriptionScreen}
						options={{
							title: t('HOME_PROFILE_SUBSCRIPTION'),
							headerShown: false
						}}
					/>
					<RootStack.Screen
						name='PayScreen'
						component={PayScreen}
						options={{
							title: t('HOME_PROFILE_SUBSCRIPTION'),
						}}
					/>
					<RootStack.Screen
						name='SubscriptionEnded'
						component={SubscriptionEndedScreen}
						options={{
							title: t('HOME_PROFILE_SUBSCRIPTION'),
							headerShown: false
						}}
					/>
					<RootStack.Screen
						name='MonitoringReport'
						component={MonitoringReportScreen}
						options={{
							title: t('MONITORING_REPORT_TITLE'),
						}}
					/>
				</RootStack.Group>
			</RootStack.Navigator>
		</NavigationContainer>
	)
})
