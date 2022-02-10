// project
import type { Blog } from './blog'
import type { User } from './user'

export interface TriggerEvent {
  _id: string
  triggerman: string | User
  targetType: 'Blog'
  target: string | Blog
  triggerType: 'LIKE' | 'COLLECT' | 'BROWSE'
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