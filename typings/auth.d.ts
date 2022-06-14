import { Core } from '.'

/**
 * 登录dto
 */
export interface LoginInput {
  keyword: string
  password: string
}

/**
 * mart模块信息
 */
export interface MartProfile {
  creationCount: number
}

/**
 * 用户信息
 */
export interface User extends Core {
  username: string
  email: string
  avatar: string
  isSelf: boolean
  isVerified: boolean
  martProfile: MartProfile
}
