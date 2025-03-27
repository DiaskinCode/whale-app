import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

export const SubscriptionScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        await Purchases.configure({
          apiKey: Platform.OS === 'ios' ? 'appl_imelWoaFdrbNEduugOQnBBTAkct' : 'goog_WILL_NEED_ANDROID_KEY',
        });

        const offerings = await Purchases.getOfferings();
        if (offerings.current?.availablePackages.length) {
          setProducts(offerings.current.availablePackages);
        } else {
          console.warn('⚠️ Нет доступных подписок');
        }
      } catch (error) {
        console.error('⚠️ Ошибка при получении подписок:', error);
      }
    };

    fetchOfferings();
  }, []);

  const handleSubscriptionSelect = async (plan: string, price: number) => {
    const planToProductId: Record<string, string> = {
      OneYear: 'annualsubscription',
      TwoWeeks: 'twoweeksubscription',
      OneMonth: 'monthlysubscription',
    };
  
    const productId = planToProductId[plan];
  
    const selectedPackage = products.find((p) => p.identifier === productId);
    console.log(selectedPackage);
    
  
    if (!selectedPackage) {
      console.warn(`⚠️ Подписка ${plan} недоступна`);
      return;
    }
  
    if (Platform.OS === 'ios') {
      try {
        console.log(`🔎 Покупка пакета: ${selectedPackage.identifier}`);
        const { customerInfo } = await Purchases.purchasePackage(selectedPackage);
    
        if (customerInfo.activeSubscriptions.includes(productId)) {
          console.log('✅ Подписка активирована!');
          navigation.goBack();
        } else {
          console.warn('⚠️ Подписка не активирована');
        }
      } catch (error) {
        console.error('⚠️ Ошибка при покупке:', error);
      }
    }
    
  };
  

  return (
    <View style={styles.popupContainer}>
      <Image source={require('@/assets/images/welcome-logo.png')} />

      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.popupText}>{t('WELCOME_FROM_SIGNUP')}</Text>

      <View style={{ marginVertical: 50 }}>
        <TouchableOpacity style={[styles.subscriptionOption, styles.bestOffer]} onPress={() => handleSubscriptionSelect('OneYear', 45900)}>
          <View>
            <Text style={styles.subscriptionTitle}>В год</Text>
            <Text style={styles.trialText}>Пробный период 3 дня</Text>
          </View>
          <Text style={styles.subscriptionPrice}>45900 ₸</Text>
          <View style={styles.bestOfferBadge}>
            <Text style={styles.bestOfferText}>Лучшее предложение</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.subscriptionOption, styles.secondaryOption]} onPress={() => handleSubscriptionSelect('TwoWeeks', 2000)}>
          <View>
            <Text style={[styles.subscriptionTitle, styles.secondaryText]}>В неделю</Text>
            <Text style={styles.secondaryText}>Пробный период 3 дня</Text>
          </View>
          <Text style={[styles.subscriptionPrice, styles.secondaryText]}>2000 ₸</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.subscriptionOption, styles.secondaryOption]} onPress={() => handleSubscriptionSelect('OneMonth', 4500)}>
          <View>
            <Text style={[styles.subscriptionTitle, styles.secondaryText]}>В месяц</Text>
            <Text style={styles.secondaryText}>Пробный период 3 дня</Text>
          </View>
          <Text style={[styles.subscriptionPrice, styles.secondaryText]}>4500 ₸</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://whalehealth.app/service-conditions/')}>
        <Text style={styles.linkText}>{t('HOME_PROFILE_TERMS_OF_USE')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://whalehealth.app/privacy-policy/')}>
        <Text style={styles.linkText}>{t('HOME_PROFILE_PRIVACY_POLICY')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    backgroundColor: '#666CF6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 10,
  },
  popupText: {
    fontSize: 29,
    width: '90%',
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
    marginTop: 40,
  },
  subscriptionOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    minWidth: '90%',
    marginTop: 10,
  },
  bestOffer: {
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#5BC54F',
  },
  secondaryOption: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  subscriptionTitle: {
    fontWeight: '600',
    fontSize: 23,
  },
  trialText: {
    fontSize: 14,
    color: '#999',
  },
  subscriptionPrice: {
    fontWeight: '700',
    fontSize: 23,
  },
  bestOfferBadge: {
    position: 'absolute',
    top: -20,
    right: 15,
    backgroundColor: '#5BC54F',
    padding: 8,
    borderRadius: 5,
  },
  bestOfferText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#fff',
  },
  secondaryText: {
    color: '#fff',
  },
  linkText: {
    color: '#eee',
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: '600',
    marginTop: 10,
  },
});

export default SubscriptionScreen;
