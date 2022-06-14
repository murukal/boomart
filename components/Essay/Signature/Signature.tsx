// react
import { useMemo } from 'react'
// mui
import { Box, Typography } from '@mui/material'
// third
import dayjs from 'dayjs'
// project
import styles from './Signature.module.css'
import type { Props } from '.'
import type { User } from '~/typings/user'

const Signature = (props: Props) => {
  const createdBy = useMemo<User>(() => {
    return props.essay.createdBy as User
  }, [props.essay])

  return (
    <Box className={props.className} style={props.style}>
      <Typography className={`${styles.content} ${styles['sub-script']} uppercase pr-2.5 mr-2.5`} component='span'>
        {dayjs(props.essay.createdAt).format('D MMM')}
      </Typography>
      <Typography className={styles.content} component='span'>{`By ${createdBy?.username}`}</Typography>
    </Box>
  )
}

export default Signature
