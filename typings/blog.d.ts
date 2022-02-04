import type { User } from './user'

export interface Blog {
  _id: string
  title: string
  content: string
  createdBy: string | User
  createdAt: string
}

export interface PublishRecord {
  _id: number
  count: number
}

export type CreativeTop5 = {
  _id: string
  count: number
  users: User[]
}[]
