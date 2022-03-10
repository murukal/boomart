// project
import requests from '.'
import type { Login, User } from '../typings/user'
import type { FetchParams } from '.'

const url = '/api/authentication'

/** 查询用户信息 */
export const getUser = (headers: Record<string, string>) =>
  requests.get<User>(url, {
    headers
  })

/** 登录 */
export const login = (params: FetchParams<Login>) => requests.post<string>(`${url}/login`, params)
