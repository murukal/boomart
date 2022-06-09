import { Tag } from './tag'

export interface Navigation {
  id: string
  title: string
  cover?: string
  tags: Tag[]
}

export interface FilterInput {
  tagIds?: number[]
}
