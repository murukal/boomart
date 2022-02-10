// react
import { useMemo } from 'react'
// mui
import { Box, Typography } from '@mui/material'
// third
import dayjs from 'dayjs'
// project
import { textStyles, subScriptStyles } from './assets'
import type { Props } from './assets'
import type { User } from '../../../typings/user'

const Signature = (props: Props) => {
  const createdBy = useMemo<User>(() => {
    return props.blog.createdBy as User
  }, [props.blog])

  return (
    <Box className={props.className}>
      <Typography
        className='uppercase pr-2.5 mr-2.5'
        component='span'
        sx={{
          ...textStyles,
          '&::after': {
            ...subScriptStyles
          }
        }}
      >
        {dayjs(props.blog.createdAt).format('D MMM')}
      </Typography>
      <Typography component='span' sx={textStyles}>{`By ${createdBy.username}`}</Typography>
    </Box>
  )
}

export default Signature
