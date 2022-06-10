import { Core } from '.'

export interface LoginInput {
  keyword: string
  password: string
}

export interface MartProfile {
  creationCount: number
}

export interface User extends Core {
  username: string
  email: string
  avatar: string
  isSelf: boolean
  martProfile: MartProfile
}
