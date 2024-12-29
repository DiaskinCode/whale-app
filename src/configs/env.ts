function setupEnvConfig() {
	if (!process.env.EXPO_PUBLIC_API_URL) {
		throw new Error('EXPO_PUBLIC_API_URL is not defined')
	}
	if (!process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID) {
		throw new Error('EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is not defined')
	}
	if (!process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID) {
		throw new Error('EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID is not defined')
	}
	if (!process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID) {
		throw new Error('EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID is not defined')
	}

	return {
		API_URL: process.env.EXPO_PUBLIC_API_URL,
		GOOGLE_WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
		GOOGLE_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
		GOOGLE_ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
	}
}

export const ENV = setupEnvConfig()
