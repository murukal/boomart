// react
import type { CSSProperties } from 'react'
// project
import type { Essay } from '../../../typings/essay'

export { default } from './Signature'

export interface Props {
  essay: Essay
  className?: string
}

export const textStyle: CSSProperties = {
  position: 'relative',
  color: '#666',
  fontSize: 10
}

export const subScriptStyle: CSSProperties = {
  content: '""',
  width: 3,
  height: 3,
  background: '#999',
  position: 'absolute',
  top: '50%',
  right: 0,
  borderRadius: '50%'
}
