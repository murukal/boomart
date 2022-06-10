// project
import type { Navigation } from '~/typings/navigation'

export { default } from './Navigations'

export interface Props {
  className?: string
  style?: React.CSSProperties
  navigations: Navigation[]
  pageCount: number
  tagIds: number[]
}
