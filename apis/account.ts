// project
import requests from '.'
import type { Login } from '../typings/user'

const url = '/api/authentication'

/** 查询用户信息 */
export const getUser = () => requests.get('/api/authentication')

/** 登录 */
export const login = (data: Login) => requests.post<string>(`${url}/login`, data)
