import { createInstance } from '@amplitude/analytics-react-native'
import * as amplitude from '@amplitude/analytics-react-native';

export const initAmplitude = async () => {
    amplitude.init('690ef82ce92b20f1d2ba7a3e785b640d');
}

export const logEvent = (eventName: string, properties?: Record<string, any>) => {
   amplitude.track(eventName, properties)
}
