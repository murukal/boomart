// project
import type { Essay } from './essay'
import type { User } from './user'

export type TriggerType = 'THUMBUP' | 'FAVORITE' | 'BROWSE' | 'COMMENT'

export interface TriggerEvent {
  _id: string
  triggerman: string | User
  targetType: 'Essay'
  target: string | Essay
  triggerType: TriggerType
}

export interface CreateTriggerEvent extends Omit<TriggerEvent, '_id' | 'triggerman'> {}

export interface TopQuery {
  limit: number
}

export type TopResults = {
  _id: string
  count: number
  target: Essay
}[]
