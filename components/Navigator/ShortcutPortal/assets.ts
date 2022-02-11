// mui
import type { PopoverOrigin } from '@mui/material'
// project
import type { MenuTreeNode } from '../../../typings/menu'

export interface Props {
  portal: Partial<MenuTreeNode>
  menuTreeNodes?: MenuTreeNode[] | null
  anchorOrigin?: PopoverOrigin
  onPrevPortalClick?: Function
}
