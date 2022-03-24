// mui
import type { PopoverOrigin } from '@mui/material'
// project
import type { Menu } from '../../../typings/menu'

export interface Props {
  portal: Partial<Menu>
  menus?: Menu[] | null
  anchorOrigin?: PopoverOrigin
  onPrevPortalClick?: Function
}
