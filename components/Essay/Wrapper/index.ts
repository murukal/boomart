// project
import type { Essay } from '../../../typings/essay'

export { default } from './Wrapper'

export interface Props {
  type?: 'horizontal' | 'vertical'
  essay: Essay
  color?: string
  className?: string
  style?: React.CSSProperties
}
