import { useAuthRequest } from 'expo-auth-session/build/providers/Google'

export const useGoogleAuth = () => {
	const [request, response, promptAsync] = useAuthRequest({
		responseType: 'token',
		clientId:
			'462672870672-da423np0s834728ddhjvim28kau063pq.apps.googleusercontent.com',
		scopes: ['profile', 'email'],
		redirectUri: 'whale://',
		clientSecret: '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',
	})

	return { request, response, promptAsync }
}
