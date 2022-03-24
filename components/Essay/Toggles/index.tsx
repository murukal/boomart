// react
import { useState } from 'react'
// mui
import { Box, IconButton } from '@mui/material'
import { ThumbUp, Favorite } from '@mui/icons-material'
// project
import { create, TargetType, Type } from '../../../apis/toggle'
import type { Props } from './assets'

const Toggles = (props: Props) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isCollected, setIsCollected] = useState(false)

  const onToggle = (type: Type) => async () => {
    const result = await create({
      targetId: props.essayId,
      targetType: TargetType.essay,
      type
    })

    if (!result.data?.createToggle) return

    // 设置状态
    switch (type) {
      case Type.like:
        setIsLiked((state) => !state)
        break
      case Type.collect:
        setIsCollected((state) => !state)
        break
    }
  }

  return (
    <Box className={props.className}>
      <IconButton onClick={onToggle(Type.like)}>
        <ThumbUp color={isLiked ? 'error' : undefined} />
      </IconButton>

      <IconButton onClick={onToggle(Type.collect)}>
        <Favorite color={isCollected ? 'error' : undefined} />
      </IconButton>
    </Box>
  )
}

export default Toggles
