// mui
import type { SxProps, Theme } from '@mui/material'
// project
import type { Essay } from '../../../typings/essay'

export { default } from './Hot'

export interface Props {
  className?: string

  browseTopEssays: Essay[] | null
  likeTopEssays: Essay[] | null
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
