// third
import axios from 'axios'
import { stringify } from 'qs'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// project
import store from '../redux'
import type { ApiResponse } from '../typings/api'

// 生成一个axios实例
const instance = axios.create({
  paramsSerializer: stringify,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

/** 结果拦截器 */
instance.interceptors.response.use(
  // http res拦截器
  (res) => res,

  // http异常拦截器
  (error): AxiosResponse<ApiResponse> => ({
    status: error.response?.status,
    statusText: error.response?.statusText,
    headers: error.response?.headers,
    config: error.response?.config,
    data: {
      code: error.response?.data?.code || -1,
      message: error.response?.data?.message,
      data: error.response?.data?.data
    }
  })
)

/** 生成一个访问请求对象 access request object */
const requests = {
  /** get */
  get: async <T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<ApiResponse<T>> => (await instance.get(url, config)).data,

  /** post */
  post: async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<ApiResponse<T>> =>
    (await instance.post(url, data, config)).data,

  /** patch */
  patch: async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<ApiResponse<T>> =>
    (await instance.patch(url, data, config)).data,

  /** delete */
  delete: async <T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<ApiResponse<T>> => (await instance.delete(url, config)).data
}

export default requests
