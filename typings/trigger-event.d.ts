// project
import type { Blog } from './blog'
import type { User } from './user'

export type TriggerType = 'THUMBUP' | 'FAVORITE' | 'BROWSE'

export interface TriggerEvent {
  _id: string
  triggerman: string | User
  targetType: 'Blog'
  target: string | Blog
  triggerType: TriggerType
}

export interface CreateTriggerEvent extends Omit<TriggerEvent, '_id' | 'triggerman'> {}

export interface TopQuery {
  limit: number
}

export type TopResults = {
  _id: string
  count: number
  target: Blog
}[]
