// project
import type { Essay } from '../../../typings/essay'

export interface Props {
  type?: 'horizontal' | 'vertical'
  essay: Essay
  color?: string
}
