// react
import { useMemo } from 'react'
// next
import type { GetServerSideProps } from 'next'
// mui
import { Container, Box, Typography, Avatar, CardMedia } from '@mui/material'
// third
import dayjs from 'dayjs'
// project
import { getBlogById } from '../../apis/blog'
import type { Blog } from '../../typings/blog'
import type { User } from '../../typings/user'
import type { Tag } from '../../typings/tag'

interface Props {
  blog: Blog
}

const Blog = (props: Props) => {
  const blog = useMemo(() => props.blog, [props.blog])

  const createdBy = useMemo(() => {
    return blog.createdBy as User
  }, [blog])

  const cover = useMemo(() => {
    return blog.cover || (blog.tags[0] as Tag | undefined)?.cover || ''
  }, [blog])

  return (
    <Container>
      {/* 抬头 */}
      <Box className='m-12'>
        <Typography className='font-black' variant='h1'>
          {blog.title}
        </Typography>

        {/* 著作信息 */}
        <Box className='mt-12 flex items-center'>
          <Avatar src={createdBy.avatar}></Avatar>

          <Box className='ml-4' color='#666'>
            <Box>
              <Typography component='span'>By </Typography>
              <Typography className='font-bold' component='span' color={(theme) => theme.palette.muted?.main}>
                {createdBy.username}
              </Typography>
            </Box>
            <Typography>{dayjs(blog.createdAt).format('YYYY MMM DD')}</Typography>
          </Box>
        </Box>

        {/* 封面 */}
        <CardMedia className='rounded-lg' component='img' height={600} image={cover} alt={blog.title} />

        {/* 博客正文 */}

        {/* 页脚 */}
      </Box>
    </Container>
  )
}

export default Blog

/** 服务端渲染 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context

  const { data: blog } = await getBlogById(params?.id as string)

  // 博客未找到，返回404
  if (!blog)
    return {
      notFound: true
    }

  return {
    props: {
      blog
    }
  }
}
