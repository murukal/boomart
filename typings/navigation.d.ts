import { Tag } from './tag'

export interface Navigation {
  id: string
  title: string
  subtitle: string
  cover?: string
  tags: Tag[]
  link: string
}

export interface FilterInput {
  tagIds?: number[]
}
