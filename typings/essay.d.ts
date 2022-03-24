// project
import type { Core } from '.'
import type { User } from './auth'
import type { Tag } from './tag'

export interface Essay extends Core {
  title: string
  content: string
  cover: string

  tags: Tag[]

  createdBy: User
}

export interface FilterInput {
  tagIds?: number[]
  ids?: number[]
}
