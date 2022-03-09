// third
import axios from 'axios'
import { stringify } from 'qs'
import type { AxiosResponse } from 'axios'
// third
import { unstable_serialize, Key } from 'swr'
// project
import type { ApiResponse, PaginateResult, QueryOptions } from '../typings/api'
import type { Essay } from '../typings/essay'

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

export const withAuthorization = (token?: string | null, headers?: Record<string, string>) => {
  const current = { ...headers }
  if (token) current['Authorization'] = `Bearer ${token}`
  return current
}

/** key构造器 */
export const generator = (keys: [string, ...(string | number)[]]) => ({
  key: keys.at(0) as string,
  fullKey: unstable_serialize(keys)
})

/** apis keys */
export const apiKeys = {
  essay: {
    latest: generator(['/api/essay/latest', 1])
  }
}

/** api合集 */
export const apis = {
  /** 请求最新文章 */
  [apiKeys.essay.latest.fullKey]: (key: string, page: number) => {
    console.log('page++++', page)

    return requests.get<PaginateResult<Essay>>('/api/essay', {
      params: {
        pagination: {
          limit: 4,
          page
        },
        populate: ['tags', 'createdBy', 'isThumbUp', 'isFavorite']
      }
    })
  }
}
