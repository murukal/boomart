// project
import type { Core } from '.'
import type { Tag } from './tag'

export interface Essay extends Core {
  title: string
  content: string
  cover: string

  tags: Tag[]
}

export interface FilterInput {
  tagIds?: number[]
  ids?: number[]
}
