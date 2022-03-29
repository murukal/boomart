import { User } from './auth'
import { Toggle } from './toggle'

export interface Comment extends Omit<Toggle, 'type'> {
  targetType: TargetType
  targetId: number

  content: string

  createdBy: User
}

export interface CreateCommentInput extends Pick<Comment, 'targetType' | 'targetId' | 'content'> {}
