// react
import type { CSSProperties } from 'react'
// project
import type { Tag } from '../../../typings/tag'

export interface Props {
  tags: Tag[]
  className?: string
}

export const subScriptStyles: CSSProperties = {
  content: '""',
  width: 3,
  height: 3,
  background: '#999',
  position: 'absolute',
  right: 0,
  bottom: 3,
  borderRadius: '50%'
}
