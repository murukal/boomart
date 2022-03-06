// mui
import { Box, IconButton } from '@mui/material'
import { ThumbUp, Favorite, Comment } from '@mui/icons-material'
// project
import type { Props } from './assets'
import type { Type as ToggleType } from '../../../typings/toggle'
import { create } from '../../../apis/toggle'
import { useSelector } from 'react-redux'
import { onLogin } from '../../../utils/account'

const Toggles = (props: Props) => {
  const isLogin = useSelector((state) => state.userProfile.isLogin)

  const onToggle = (type: ToggleType) => async () => {
    // 鉴权
    if (!isLogin) {
      onLogin()
      return
    }

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
