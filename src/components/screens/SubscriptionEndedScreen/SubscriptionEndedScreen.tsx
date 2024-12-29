import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { sessionStore } from '@/src/stores/session';
import { useTranslation } from 'react-i18next'

export const SubscriptionEndedScreen = () => {
    const navigation = useAppNavigation();
    const { logoutAction } = sessionStore
    const { t } = useTranslation()
    const handleLogout = async () => {
		await logoutAction()
        navigation.push('SignIn')
	}
    return (
        <View style={styles.popupContainer}>
          <Text style={styles.popupTextHeadline}>
            Ваша подписка истекла.
          </Text>
          <Text style={styles.popupText}>
            Продлите подписку, чтобы продолжить пользоваться сервисом.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={()=>{navigation.push('Subscription')}}>
            <Text style={{color:'#fff',fontSize:18,fontWeight:'600'}}>{t('PAY_NOW_BUTTON')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout}>
            <Text style={{color:'#fff',fontSize:18,fontWeight:'600'}}>{t('HOME_PROFILE_LOGOUT')}</Text>
          </TouchableOpacity>
        </View>
    );
  };
  

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
      marginTop:150,
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