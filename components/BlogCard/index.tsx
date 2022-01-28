// mui
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
// next
import { useRouter } from 'next/router'
// project
import type { Props } from './assets'
import type { User } from '../../typings/user'
import { useMemo } from 'react'

/** 按内容的长度设定不同的卡片高度 */
const getHeight = (length: number) => {
  return length > 500 ? 400 : length > 100 ? 150 : 50
}

const BlogCard = (props: Props) => {
  const router = useRouter()

  const user = useMemo(() => {
    return props.blog.createdBy as User | undefined
  }, [props.blog])

  const height = useMemo(() => {
    return getHeight(props.blog.content.length)
  }, [props.blog])

  const onCardClick = () => router.push(`/blog/${props.blog._id}`)

  return (
    <Card onClick={onCardClick}>
      {/* 卡片标题 */}
      <CardHeader
        avatar={<Avatar src={user?.avatar} aria-label={user?.username} />}
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
        title={props.blog.title}
        subheader={props.blog.createdAt}
      />

      <CardContent
        className='overflow-hidden'
        sx={{
          height
        }}
      >
        <Typography variant='body2' color='text.secondary'>
          {props.blog.content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default BlogCard
