import { Core } from '.'

export interface Essay extends Core {
  title: string
  content: string
  cover: string
}

export interface FilterInput {
  tagIds?: number[]
}
