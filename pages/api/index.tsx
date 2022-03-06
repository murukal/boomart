import { getSession } from 'next-auth/react'
import { stringify } from 'qs'
import { ApiResponse } from '../../typings/api'

interface Headers extends Record<string, string> {
  Authorization: string
}

interface Config {
  params?: any
  headers?: Headers
}

class AccessRequest {
  private baseUrl?: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  }

  /** get */
  async get<T = any>(url: string, config: Config): Promise<ApiResponse<T>> {
    return await (
      await fetch(`${this.baseUrl}${url}?${stringify(config.params)}`, {
        method: 'get',
        headers: config.headers
      }).then((e) => e)
    ).json()
  }

  /** post */
  async post<T = any>(url: string, config: Config): Promise<ApiResponse<T>> {
    return await (
      await fetch(`${this.baseUrl}${url}`, {
        method: 'post',
        body: JSON.stringify(config.params),
        headers: config.headers
      }).then((e) => e)
    ).json()
  }
}

// 初始化请求对象
const ar = new AccessRequest()

export default ar
