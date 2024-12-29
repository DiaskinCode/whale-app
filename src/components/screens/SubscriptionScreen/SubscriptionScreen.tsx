import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export const SubscriptionScreen = ({ navigation }: any) => {
  const { t } = useTranslation();

  const handleSubscriptionSelect = (plan: string, price: number) => {
    navigation.navigate('PayScreen', { subscriptionPlan: plan, price });
  };

  return (
    <View style={styles.popupContainer}>
      <Image source={require('@/assets/images/welcome-logo.png')} />

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.popupText}>{t('WELCOME_FROM_SIGNUP')}</Text>


      <View
          style={{
            marginVertical: 50,
          }}
        >

        <TouchableOpacity
            style={[styles.subscriptionOption, styles.bestOffer]}
            onPress={() => handleSubscriptionSelect('OneYear', 45900)}
        >
            <View>
            <Text style={styles.subscriptionTitle}>В год</Text>
            <Text style={styles.trialText}>Пробный период 3 дня</Text>
            </View>
            <Text style={styles.subscriptionPrice}>45900 ₸</Text>
            <View style={styles.bestOfferBadge}>
            <Text style={styles.bestOfferText}>Лучшее предложение</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.subscriptionOption, styles.secondaryOption]}
            onPress={() => handleSubscriptionSelect('TwoWeeks', 3000)}
        >
            <View>
            <Text style={[styles.subscriptionTitle, styles.secondaryText]}>В 2 недели</Text>
            <Text style={styles.secondaryText}>Пробный период 3 дня</Text>
            </View>
            <Text style={[styles.subscriptionPrice, styles.secondaryText]}>3000 ₸</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.subscriptionOption, styles.secondaryOption]}
            onPress={() => handleSubscriptionSelect('OneMonth', 4500)}
        >
            <View>
            <Text style={[styles.subscriptionTitle, styles.secondaryText]}>В месяц</Text>
            <Text style={styles.secondaryText}>Пробный период 3 дня</Text>
            </View>
            <Text style={[styles.subscriptionPrice, styles.secondaryText]}>4500 ₸</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity
        onPress={() =>
          WebBrowser.openBrowserAsync(
            'https://whalehealth.app/service-conditions/'
          )
        }
      >
        <Text style={styles.linkText}>{t('HOME_PROFILE_TERMS_OF_USE')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          WebBrowser.openBrowserAsync('https://whalehealth.app/privacy-policy/')
        }
      >
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
    paddingTop:50
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 10,
  },
  popupText: {
    fontSize: 29,
    width:'90%',
    textAlign:'center',
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
  trialButton: {
    backgroundColor: '#5BC54F',
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    height: 60,
    marginTop: 40,
    justifyContent: 'center',
  },
  trialButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkText: {
    color: '#eee',
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: '600',
    marginTop: 10,
  },
});
