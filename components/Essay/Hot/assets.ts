// react
import type { MouseEventHandler } from 'react'
// mui
import type { SxProps, Theme } from '@mui/material'
// project
import type { TopResults } from '../../../typings/toggle'

export interface Props {
  className?: string
  browseTopResults: TopResults
  likeTopResults: TopResults
  onClick?: (id: string) => MouseEventHandler
}

export const getHotTagStyle: SxProps<Theme> = (theme: Theme) => ({
  position: 'relative',
  marginLeft: '8px',
  color: theme.palette.muted?.main,
  '&::before': {
    content: '"#"',
    color: theme.palette.muted?.main,
    marginRight: '4px'
  }
})
