export interface Navigation {
  id: string
  title: string

  tags: Tag[]
}

export interface FilterInput {
  tagIds?: number[]
}
