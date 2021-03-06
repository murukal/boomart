import { Core } from '.'
import { TargetType, Type } from '../apis/toggle'

export interface TopInput {
  type: Type
  limit: number
  from: Date
  to: Date
}

export interface Toggle extends Core {
  type: Type
  targetType: TargetType
  targetId: number
}

export interface CreateToggleInput extends Pick<Toggle, 'type' | 'targetType' | 'targetId'> {}

export interface RemoveToggleInput extends CreateToggleInput {}
