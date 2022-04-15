// react
import { useState } from 'react'
// next
import { signIn, useSession } from 'next-auth/react'
// mui
import { Box, IconButton } from '@mui/material'
import { ThumbUp, Favorite } from '@mui/icons-material'
// third
import { useQuery } from '@apollo/client'
// project
import { ESSAY_TOGGLE } from '~/apis/essay'
import { create, remove, TargetType, Type } from '~/apis/toggle'
import type { Props } from '.'

const Toggles = (props: Props) => {
  const [isToggled, setIsToggled] = useState<Record<Type.Like | Type.Collect, boolean>>({
    Like: false,
    Collect: false
  })

  useQuery(ESSAY_TOGGLE, {
    variables: {
      id: props.essayId
    },
    onCompleted: (data) => {
      setIsToggled({
        Like: data.essay.isLiked,
        Collect: data.essay.isCollected
      })
    },
    fetchPolicy: 'no-cache'
  })

  // 登录状态
  const { status: sessionStatus } = useSession()

  const onToggle = (type: Type.Like | Type.Collect) => async () => {
    // 未登录，跳转登录
    if (sessionStatus !== 'authenticated') {
      signIn()
      return
    }

    const handlers = {
      create: () =>
        create({
          targetId: props.essayId,
          targetType: TargetType.Essay,
          type
        }),
      remove: () =>
        remove({
          targetId: props.essayId,
          targetType: TargetType.Essay,
          type
        })
    }

    const result = isToggled[type]
      ? (await handlers.remove()).data?.removeToggle
      : (await handlers.create()).data?.createToggle

    if (!result) return

    isToggled[type] = !isToggled[type]

    // 设置状态
    setIsToggled({ ...isToggled })
  }

  return (
    <Box className={props.className}>
      <IconButton onClick={onToggle(Type.Like)}>
        <ThumbUp color={isToggled.Like ? 'primary' : undefined} />
      </IconButton>

      <IconButton onClick={onToggle(Type.Collect)}>
        <Favorite color={isToggled.Collect ? 'error' : undefined} />
      </IconButton>
    </Box>
  )
}

export default Toggles
