// react
import type { MouseEventHandler } from 'react'
// mui
import type { SxProps, Theme } from '@mui/material'
// project
import type { TopResults } from '../../../typings/trigger-event'

export interface Props {
  className?: string
  browseTopResults: TopResults
  likeTopResults: TopResults
  onClick?: (id: string) => MouseEventHandler
}

export const getHotTagStyle: SxProps<Theme> = (theme: Theme) => ({
  position: 'relative',
  fontSize: '12px',
  marginLeft: '8px',
  color: theme.palette.muted?.main,
  '&::before': {
    content: '"#"',
    fontSize: '12px',
    color: theme.palette.muted?.main,
    marginRight: '4px'
  }
})
