import { Core } from '.'

export interface LoginInput {
  keyword: string
  password: string
}

export interface User extends Core {
  username: string
  email: string
  avatar: string
}
