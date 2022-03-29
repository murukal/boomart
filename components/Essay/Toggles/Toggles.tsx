// react
import { useState } from 'react'
// mui
import { Box, IconButton } from '@mui/material'
import { ThumbUp, Favorite } from '@mui/icons-material'
// third
import { useQuery } from '@apollo/client'
// project
import { ESSAY_TOGGLE } from '../../../apis/essay'
import { create, remove, TargetType, Type } from '../../../apis/toggle'
import type { Props } from '.'
import { signIn, useSession } from 'next-auth/react'

const Toggles = (props: Props) => {
  const [isToggled, setIsToggled] = useState<Record<Type.like | Type.collect, boolean>>({
    like: false,
    collect: false
  })

  useQuery(ESSAY_TOGGLE, {
    variables: {
      id: props.essayId
    },
    onCompleted: (data) => {
      setIsToggled({
        like: data.essay.isLiked,
        collect: data.essay.isCollected
      })
    }
  })

  // 登录状态
  const { status: sessionStatus } = useSession()

  const onToggle = (type: Type.like | Type.collect) => async () => {
    // 未登录，跳转登录
    if (sessionStatus !== 'authenticated') {
      signIn()
      return
    }

    const handlers = {
      create: () =>
        create({
          targetId: props.essayId,
          targetType: TargetType.essay,
          type
        }),
      remove: () =>
        remove({
          targetId: props.essayId,
          targetType: TargetType.essay,
          type
        })
    }

    const result = isToggled[type] ? (await handlers.remove()).data?.removeToggle : (await handlers.create()).data?.createToggle

    if (!result) return

    isToggled[type] = !isToggled[type]

    // 设置状态
    setIsToggled({ ...isToggled })
  }

  return (
    <Box className={props.className}>
      <IconButton onClick={onToggle(Type.like)}>
        <ThumbUp color={isToggled.like ? 'error' : undefined} />
      </IconButton>

      <IconButton onClick={onToggle(Type.collect)}>
        <Favorite color={isToggled.collect ? 'error' : undefined} />
      </IconButton>
    </Box>
  )
}

export default Toggles
