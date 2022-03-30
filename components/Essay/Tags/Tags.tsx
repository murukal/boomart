// mui
import { Box, Typography } from '@mui/material'
// project
import styles from './Tags.module.css'
import type { Props } from '.'

const Tags = (props: Props) => {
  return (
    <Box className={props.className}>
      {props.tags.map((tag) => (
        <Typography key={tag.id} className={`${styles.tag} mr-2.5`} component='span'>
          {tag.name}
        </Typography>
      ))}
    </Box>
  )
}

export default Tags
