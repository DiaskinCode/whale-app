import { ENV } from '@/src/configs'
import { sessionStore } from '@/src/stores/session'
import axios from 'axios'

export const baseApi = axios.create({
	baseURL: ENV.API_URL,
})

baseApi.interceptors.request.use(
	config => {
		const session = sessionStore?.session

		if (!!session?.accessToken) {
			config.headers.Authorization = `Bearer ${session.accessToken}`
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

baseApi.interceptors.response.use(
	response => {
		return response.data
	},
	error => {
		return Promise.reject(error)
	}
)
