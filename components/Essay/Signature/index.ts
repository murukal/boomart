// react
import type { CSSProperties } from 'react'
// project
import type { Essay } from '../../../typings/essay'

export { default } from './Signature'

export interface Props {
  essay: Essay
  className?: string
}
