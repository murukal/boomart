// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// mui
import { Box, Card, Typography, CardMedia, CardContent, TextField, Button, Avatar } from '@mui/material'
// third
import { useSession } from 'next-auth/react'
// project
import { getTitleStyle } from '../../../layouts/Footer'
import { COMMENTS, create } from '../../../apis/comment'
import type { Props } from '.'
import { useQuery } from '@apollo/client'

const Comments = (props: Props) => {
  const [content, setContent] = useState('')

  /** 用户信息 */
  const { status: sessionStatus } = useSession()

  /** 获取评论列表 */
  const { data, refetch } = useQuery(COMMENTS, {
    variables: {
      filterInput: {
        targetId: props.targetId,
        targetType: props.targetType
      }
    }
  })

  /** 发表评论 */
  const onSubmit = async () => {
    const result = await create({
      content,
      targetType: props.targetType,
      targetId: props.targetId
    })

    // 评论完成，重新拉取数据
    if (result.data?.createComment) {
      refetch()
      setContent('')
    }
  }

  /** 评论内容发生变更 */
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

  return (
    <Box className={props.className}>
      {data?.comments.length && (
        <Box>
          <Typography sx={getTitleStyle}>comments</Typography>

          {/* 评论列表 */}
          {data.comments.map((comment) => {
            return (
              <Card key={comment.id} className='mt-7 flex' elevation={0}>
                <Avatar className='w-14 h-14' src={comment.createdBy.avatar} />

                <CardContent
                  sx={{
                    marginLeft: '1.25rem',
                    padding: 0,
                    flex: 1
                  }}
                >
                  <Typography fontSize={15} color='#777777'>
                    {comment.content}
                  </Typography>

                  <Box className='mt-3 flex items-center'>
                    <Typography variant='h6' color='#2a2a2a'>
                      {comment.createdBy.username}
                    </Typography>
                    <Typography className='ml-5' color='#999999'>
                      6 minutes ago
                    </Typography>

                    {/* <Button variant='text' className='ml-auto'>
                      Reply
                    </Button> */}
                  </Box>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      )}

      {sessionStatus === 'authenticated' && (
        <Box>
          {/* 发表评论 */}
          <Typography className='mt-20' sx={getTitleStyle}>
            发表评论
          </Typography>

          <TextField
            className='mt-7 w-full'
            label='友善的评论'
            value={content}
            multiline
            rows={3}
            onChange={onContentChange}
          />

          <Button className='mt-7 rounded-3xl' variant='contained' onClick={onSubmit}>
            发表评论
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Comments
