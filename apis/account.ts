// project
import { AxiosRequestConfig } from 'axios'
import requests from '.'
import type { Login, User } from '../typings/user'

const url = '/api/authentication'

/** 查询用户信息 */
export const getUser = (config: AxiosRequestConfig) => requests.get<User>('/api/authentication', config)

/** 登录 */
export const login = (data: Login) => requests.post<string>(`${url}/login`, data)
