// mui
import type { SxProps, Theme } from '@mui/material'

export interface Props {
  className?: string
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
