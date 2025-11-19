import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'

const BASE_URL = 'https://12292.wu.elitepro.ltd/api'

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    throw error
  }
)

export const apiService = {
  get: <T>(url: string, params?: object) =>
    api.get<T>(url, { params }).then((res: AxiosResponse<T>) => res.data),

  post: <T>(url: string, data?: object) =>
    api.post<T>(url, data).then((res: AxiosResponse<T>) => res.data),

  put: <T>(url: string, data?: object) =>
    api.put<T>(url, data).then((res: AxiosResponse<T>) => res.data),

  patch: <T>(url: string, data?: object) =>
    api.patch<T>(url, data).then((res: AxiosResponse<T>) => res.data),

  delete: <T>(url: string, data?: object) =>
    api.delete<T>(url, { data }).then((res: AxiosResponse<T>) => res.data),
}
