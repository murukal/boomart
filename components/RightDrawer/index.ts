import { ModalProps } from '@mui/material'
import { ReactNode } from 'react'

export { default } from './RightDrawer'

export interface Props {
  isOpened: boolean
  onClose?: ModalProps['onClose']
}
