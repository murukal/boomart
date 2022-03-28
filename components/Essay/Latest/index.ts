// project
import type { Essay } from '../../../typings/essay'

export { default } from './Latest'

export interface Props {
  className?: string

  essays: Essay[]
  pageCount: number
}
