// mui
import type { SxProps, Theme } from '@mui/material'

export interface Props {
  className?: string
}

export const getTitleStyle: SxProps<Theme> = () => ({
  fontSize: 12,
  textTransform: 'uppercase',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: '#eaecee',
  position: 'relative',
  paddingBottom: '12px',
  marginBottom: '16px',
  '&::after': {
    content: '""',
    backgroundColor: 'black',
    height: '3px',
    width: '50px',
    position: 'absolute',
    bottom: 0,
    left: 0
  }
})

export const getContentStyle: SxProps<Theme> = (theme) => ({
  color: theme.palette.muted?.main,
  fontSize: 12,
  fontWeight: 400
})
