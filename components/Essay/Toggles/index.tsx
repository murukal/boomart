// mui
import { Box, IconButton } from '@mui/material'
import { ThumbUp, Favorite, Comment } from '@mui/icons-material'
// project
import type { Props } from './assets'
import type { Type as ToggleType } from '../../../typings/toggle'
import { create } from '../../../apis/toggle'

const Toggles = (props: Props) => {
  const onToggle = (type: ToggleType) => async () => {
    const res = await create({
      target: props.essayId,
      targetType: 'essay',
      type
    })

    console.log('res====', res)
  }

  return (
    <Box className={props.className}>
      <IconButton onClick={onToggle('THUMBUP')}>
        <ThumbUp />
      </IconButton>

      <IconButton onClick={onToggle('FAVORITE')}>
        <Favorite />
      </IconButton>

      <IconButton onClick={onToggle('COMMENT')}>
        <Comment />
      </IconButton>
    </Box>
  )
}

export default Toggles
