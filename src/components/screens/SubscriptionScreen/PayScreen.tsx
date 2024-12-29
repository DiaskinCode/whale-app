import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import CryptoJS from 'crypto-js';
import { sessionStore } from '@/src/stores/session'

export const PayScreen = ({ route }: any) => {
  const { subscriptionPlan, price } = route.params;
  const webViewRef = useRef<WebView>(null);
  const { account } = sessionStore

  useEffect(() => {
    const injectedJavaScript = `window.alert = function() {};`;
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(injectedJavaScript);
    }
    return () => {
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript('');
      }
    };
  }, []);

  const generatePaymentUrl = (login: string, pass1: string, invId: number, outSumm: number, desc: string, email:any) => {
    const baseString = `${login}:${outSumm}:${invId}:${pass1}:Shp_email=${email}:Shp_subscription=${subscriptionPlan}`;
    const crc = CryptoJS.MD5(baseString).toString();
    return `https://auth.robokassa.kz/Merchant/Index.aspx?MerchantLogin=${login}&OutSum=${outSumm}&InvId=${invId}&Description=${encodeURIComponent(desc)}&Shp_subscription=${subscriptionPlan}&Shp_email=${email}&SignatureValue=${crc}`;
  };

  const login = 'mobile_app';
  const pass1 = 'whalehealth1';
  const email = account?.email;
  const desc =
    subscriptionPlan === 'OneYear'
      ? 'Подписка на год'
      : subscriptionPlan === 'TwoWeeks'
      ? 'Подписка на 2 недели'
      : 'Подписка на месяц';

  const paymentUrl = generatePaymentUrl(login, pass1, 0, price, desc,email);
  console.log(paymentUrl);
  

  return <WebView ref={webViewRef} style={{ flex: 1 }} source={{ uri: paymentUrl }} />;
};
