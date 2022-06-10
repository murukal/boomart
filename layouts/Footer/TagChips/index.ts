// project
import { ChipTypeMap } from '@mui/material'
import { Tag } from '~/typings/tag'

export { default } from './TagChips'

export interface Props {
  tags?: Tag[]
  clickable?: boolean
  color?: ChipTypeMap['props']['color']
  variant?: ChipTypeMap['props']['variant']
}
