// third
import axios from 'axios'
import { stringify } from 'qs'
import type { AxiosResponse } from 'axios'
// project
import type { ApiResponse, QueryOptions } from '../typings/api'

// 生成一个axios实例
const instance = axios.create({
  paramsSerializer: stringify,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true
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
      message: error.response?.data?.message || null,
      data: error.response?.data?.data || null
    }
  })
)

/** 生成一个访问请求对象 access request object */
const requests = {
  /** get */
  get: async <T = any>(url: string, params?: FetchParams): Promise<ApiResponse<T>> =>
    (
      await instance.get(url, {
        params: params?.params,
        headers: params?.headers
      })
    ).data,

  /** post */
  post: async <T = any>(url: string, params?: FetchParams): Promise<ApiResponse<T>> =>
    (
      await instance.post(url, params?.data, {
        headers: params?.headers
      })
    ).data,

  /** patch */
  patch: async <T = any>(url: string, params?: FetchParams): Promise<ApiResponse<T>> =>
    (
      await instance.patch(url, params?.data, {
        headers: params?.headers
      })
    ).data,

  /** delete */
  delete: async <T = any>(url: string, params?: FetchParams): Promise<ApiResponse<T>> =>
    (
      await instance.delete(url, {
        headers: params?.headers
      })
    ).data
}

export default requests

export interface FetchParams<T = Record<string, any>> {
  // 请求头
  headers?: Record<string, string>
  // 请求携带参数
  params?: QueryOptions
  // 请求体
  data?: T
}

/** 获取jwt秘钥api */
export const getJwtSecret = () => requests.get<string>('/api/jwt-secret')
