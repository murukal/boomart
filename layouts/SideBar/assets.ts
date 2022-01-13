// mui
import { SlideProps } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

export interface Props {
  isOpened: boolean
  onDrawerToggle: () => void
  transitionDuration?: TransitionProps['timeout']
  SlideProps?: Partial<SlideProps>
}
