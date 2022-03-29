// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// mui
import { Box, Card, Typography, CardMedia, CardContent, TextField, Button } from '@mui/material'
// third
import { useSession } from 'next-auth/react'
// project
import { getTitleStyle } from '../../../layouts/Footer'
import { create } from '../../../apis/comment'
import type { Props } from '.'

const Comments = (props: Props) => {
  const [content, setContent] = useState('')

  /** 用户信息 */
  const { status: sessionStatus } = useSession()

  /** 发表评论 */
  const onSubmit = async () => {
    console.log('content=========', content)

    // const result = await create({
    //   content,
    //   targetType: props.targetType,
    //   targetId: props.targetId
    // })
  }

  /** 评论内容发生变更 */
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

  return (
    <Box className={props.className}>
      <Typography sx={getTitleStyle}>comments</Typography>

      {/* 评论列表 */}
      <Card className='mt-7 flex' elevation={0}>
        <CardMedia className='rounded-full w-14 h-14' component='img' image='' alt='测试' />
        <CardContent className='ml-5 p-0'>
          <Typography fontSize={15} color='#777777'>
            Vestibulum euismod, leo eget varius gravida, eros enim interdum urna, non rutrum enim ante quis metus. Duis porta ornare nulla ut bibendum
          </Typography>

          <Box className='mt-3 flex items-center'>
            <Typography variant='h6' color='#2a2a2a'>
              Rosie
            </Typography>
            <Typography className='ml-5' color='#999999'>
              6 minutes ago
            </Typography>
            <Typography className='ml-auto'>Reply</Typography>
          </Box>
        </CardContent>
      </Card>

      {sessionStatus === 'authenticated' && (
        <Box>
          {/* 发表评论 */}
          <Typography className='mt-20' sx={getTitleStyle}>
            发表评论
          </Typography>

          <TextField className='mt-7 w-full' label='友善的评论' value={content} multiline rows={3} onChange={onContentChange} />

          <Button className='mt-7 rounded-3xl' variant='contained' onClick={onSubmit}>
            发表评论
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Comments
