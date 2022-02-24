// mui
import { Box, IconButton } from '@mui/material'
import { ThumbUp, Favorite, Comment } from '@mui/icons-material'
// project
import type { Props } from './assets'
import type { Type as ToggleType } from '../../../typings/toggle'

const Triggers = (props: Props) => {
  const onTrigger = (triggerType: ToggleType) => () => {}

  return (
    <Box className={props.className}>
      <IconButton onClick={onTrigger('THUMBUP')}>
        <ThumbUp />
      </IconButton>

      <IconButton onClick={onTrigger('FAVORITE')}>
        <Favorite />
      </IconButton>

      <IconButton onClick={onTrigger('COMMENT')}>
        <Comment />
      </IconButton>
    </Box>
  )
}

export default Triggers
