import { Core } from '.'

export interface Tag extends Core {
  name: string
  image: string
}

export interface TopTag extends Pick<Tag, 'id' | 'name'> {
  creationCount: number
}
