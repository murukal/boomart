import { Core } from '.'
import { TargetType } from '../apis/toggle'
import { User } from './auth'
import { Toggle } from './toggle'

export interface Comment extends Core {
  content: string
  createdBy: User
}

export interface CreateCommentInput extends Pick<Comment, 'targetType' | 'targetId' | 'content'> {}

export interface FilterInput {
  targetType: TargetType
  targetId: number
}
