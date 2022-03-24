import { Core } from '.'
import { TargetType, Type } from '../apis/toggle'

export interface TopInput {
  type: Type
  limit: number
  targetType: TargetType
  from: Date
  to: Date
}

export interface Toggle extends Core {
  type: Type
  targetType: TargetType
  targetId: number
}

export interface CreateToggleInput extends Pick<Toggle, 'type' | 'targetType' | 'targetId'> {}
