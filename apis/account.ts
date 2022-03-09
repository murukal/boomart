// project
import requests from '.'
import type { Login, User } from '../typings/user'
import type { FetchParams } from '.'

const url = '/api/authentication'

/** 查询用户信息 */
export const getUser = (params: FetchParams) => requests.get<User>(url, params)

/** 登录 */
export const login = (params: FetchParams<Login>) => requests.post<string>(`${url}/login`, params)
