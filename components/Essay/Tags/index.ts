// react
import type { CSSProperties } from 'react'
// project
import type { Tag } from '../../../typings/tag'

export { default } from './Tags'

export interface Props {
  tags: Tag[]
  className?: string
}
