// mui
import { Box, Typography } from '@mui/material'
// project
import { subScriptStyle } from './assets'
import type { Props } from './assets'

const Tags = (props: Props) => {
  return (
    <Box className={props.className}>
      {props.tags.map((tag) => (
        <Typography
          key={tag.id}
          className='mr-2.5'
          component='span'
          sx={{
            paddingRight: '7px',
            position: 'relative',
            '&::after': subScriptStyle
          }}
        >
          {tag.name}
        </Typography>
      ))}
    </Box>
  )
}

export default Tags
