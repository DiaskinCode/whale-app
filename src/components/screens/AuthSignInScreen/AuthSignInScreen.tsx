import { Button } from '@/src/components/atoms/Button'
import { Line } from '@/src/components/atoms/Line'
import { sessionStore } from '@/src/stores/session'
import { LinkButton } from '@/src/components/atoms/LinkButton'
import { BottomSpace } from '@/src/components/layouts/BottomSpace'
import { accountApi } from '@/src/services/api/account'
import { BottomView } from '@/src/components/layouts/BottomView'
import { SignInForm } from '@/src/components/molecules/SignInForm'
import { useAppNavigation } from '@/src/hooks/useAppNavigation'
import { useSignInForm } from '@/src/hooks/useSignInForm'
import { useTheme } from '@/src/hooks/useTheme'
import { purposeApi } from '@/src/services/api/purpose'
import { AxiosError } from 'axios'
import * as WebBrowser from 'expo-web-browser'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native'
import { useQuery } from 'react-query'
import { OAuth } from './components/OAuth'
import { MaterialIcons } from '@expo/vector-icons';

export const AuthSignInScreen = observer(({ route }: any) => {
  const { account, loginAction } = sessionStore
  const { t } = useTranslation()
  const [isModalVisible, setModalVisible] = useState(false)
  const primaryColor = useTheme().primary
  const navigation = useAppNavigation()
  
  const fromSignUp = route?.params?.fromSignUp || false
  const email = route?.params?.email

  const userPurposeListQuery = useQuery({
    queryKey: ['userPurposeList'],
    queryFn: async () => {
      const res = await purposeApi.getUserAll({
        pagination: {
          page: 1,
          pageSize: 10,
        },
        relations: {
          icon: true,
        },
      })
      return res
    },
    enabled: !!account,
  })
  
  const form = useSignInForm()

  const handleSignIn = form.handleSubmit(async data => {
    try {
      await loginAction({
        identifier: data.email,
        password: data.password,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          form.setError('root', { message: 'SIGN_IN_PASSWORD_ERROR' })
          return
        } else if (error.response?.status === 404) {
          form.setError('root', { message: 'SIGNIN_EMAIL_ERROR' })
          return
        }
      }
      form.setError('root', { message: 'COMMON_ERROR' })
    }
  })

  
  
  const handleFreeTrial = async () => {	
	try {
	  await accountApi.startFreeTrial({ accountId:email });
	  console.log('Free trial started successfully');
	  setModalVisible(false);
	} catch (error) {
	  if (error instanceof AxiosError) {
		console.log('Error Response:', error.response?.data);
	  } else {
		console.log('Unexpected Error:', error);
	  }
	}
  };

  const handleSubscribe = () => {
    navigation.push('Subscription')
    setModalVisible(false)
  }

  useEffect(() => {
    if (fromSignUp) {
      setModalVisible(true)
    }

    if (!account || !userPurposeListQuery.data) return
    navigation.reset({
      index: 0,
      routes: [{ name: 'PurposeList', params: { screen: 'Index' } }],
    })
  }, [account, userPurposeListQuery.data, fromSignUp])

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.form}>
            <SignInForm form={form} />
          </View>
          <Line />
          <OAuth />
          <LinkButton
            color={primaryColor}
            onPress={() => navigation.push('SignUp')}
          >
            {t('SIGNIN_SIGNUP_BUTTON')}
          </LinkButton>
          <LinkButton
            color={primaryColor}
            onPress={() => navigation.push('ForgotPassword')}
          >
            {t('SIGNIN_FORGOT_BUTTON')}
          </LinkButton>
        </View>
        <BottomSpace />
      </ScrollView>
      <BottomView>
        <Button onPress={handleSignIn}>{t('SIGNIN_BUTTON')}</Button>
      </BottomView>

      {/* Modal for free trial and subscription */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.popupContainer}>
          <Text style={styles.popupTextHeadline}>
		  	    Привет!
          </Text>
          <Text style={styles.popupText}>
            Ты только что сделал(а) крутой шаг! С нашим приложением ты больше не забудешь, когда принимать лекарства или следить за симптомами. Мы будем напоминать тебе, чтобы ты всегда был(а) на чеку и не пропустил(а) важное.
            {'\n\n'}
            У тебя есть 3 дня бесплатного доступа! Настрой напоминания и проверь, как удобно отслеживать все приёмы и симптомы.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={handleFreeTrial}>
            <Text style={{color:'#fff',fontSize:18,fontWeight:'600'}}>{t('START_TRIAL_BUTTON')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleSubscribe}>
            <Text style={{color:'#fff',fontSize:18,fontWeight:'600'}}>{t('PAY_NOW_BUTTON')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <MaterialIcons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
})

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
  form: {
    flex: 1,
  },
  popupContainer: {
    flex: 1,
    backgroundColor: '#666CF6',
    justifyContent: 'center',
    padding: 40,
  },
  popupText: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 18,
    lineHeight: 22,
    marginTop: 30,
    fontWeight: '500',
    color: '#fff',
  },
  popupTextHeadline: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 30,
  },
  primaryButton:{
	width:'100%',
	backgroundColor:'#30CE49',
	height:60,
	borderRadius:15,
	marginTop:100,
	alignItems:'center',
	justifyContent:'center'
  },
  secondaryButton:{
	width:'100%',
	backgroundColor:'#666DFB',
	height:60,
	borderRadius:15,
	alignItems:'center',
	justifyContent:'center'
  }
})

