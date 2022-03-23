import { TargetType, Type } from '../apis/toggle'

export interface TopInput {
  type: Type
  limit: number
  targetType: TargetType
  from: Date
  to: Date
}
