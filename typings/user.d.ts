import { Core } from '.'

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
  emailAddress: string
  avatar: string
  isSelf: boolean
  isVerified: boolean
  martProfile: MartProfile
}
