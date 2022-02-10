// react
import type { CSSProperties } from 'react'
// project
import type { Blog } from '../../../typings/blog'

export interface Props {
  blog: Blog
  className?: string
}

export const textStyles: CSSProperties = {
  position: 'relative',
  color: '#666',
  fontSize: 10
}

export const subScriptStyles: CSSProperties = {
  content: '""',
  width: 3,
  height: 3,
  background: '#999',
  position: 'absolute',
  top: '50%',
  right: 0,
  borderRadius: '50%'
}
