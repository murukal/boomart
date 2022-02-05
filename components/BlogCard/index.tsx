// next
import { useRouter } from 'next/router'
// mui
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography, CardMedia, Chip, Box } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
// third
import dayjs from 'dayjs'
// project
import { useMemo } from 'react'
import type { Props } from './assets'
import type { User } from '../../typings/user'
import type { Tag } from '../../typings/tag'

const BlogCard = (props: Props) => {
  const router = useRouter()

  const user = useMemo(() => {
    return props.blog.createdBy as User | undefined
  }, [props.blog])

  const onCardClick = () => router.push(`/blog/${props.blog._id}`)

  /** 格式化展示时间 */
  const createdAt = useMemo(() => {
    return dayjs(props.blog.createdAt).format('YYYY-MM-DD HH:mm:ss')
  }, [props.blog.createdAt])

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
        title={user?.username}
        subheader={createdAt}
      />

      <CardMedia component='img' src={props.blog.cover || (props.blog.tags[0] as Tag).cover} height={100} />

      <CardContent>
        <Typography variant='body2' color='text.secondary' noWrap>
          {props.blog.title}
        </Typography>

        <Box className='mt-2'>
          {props.blog.tags.map((tag, index) => (
            <Chip
              sx={[
                index !== 0 && {
                  marginLeft: '4px'
                }
              ]}
              key={(tag as Tag)._id}
              label={(tag as Tag).name}
              size='small'
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default BlogCard
