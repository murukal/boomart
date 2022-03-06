// project
import type { Essay } from './essay'
import type { User } from './user'

export type Type = 'THUMBUP' | 'FAVORITE' | 'BROWSE' | 'COMMENT'

export interface Toggle {
  _id: string
  createdBy: string | User
  targetType: 'essay'
  target: string | Essay
  type: Type
}

export interface CreateToggle extends Omit<Toggle, '_id' | 'createdBy'> {}

export interface TopQuery {
  limit: number
}

export type TopResults = {
  _id: string
  count: number
  target: Essay
}[]
