// next
import type { GetServerSideProps } from 'next'
// mui
import { Container, Box, Typography } from '@mui/material'
// project
import type { Blog } from '../../typings/blog'
import { getBlogById } from '../../apis/blog'

interface Props {
  blog: Blog
}

const Blog = (props: Props) => {
  return (
    <Container>
      {/* 抬头 */}
      <Box className='m-12'>
        <Typography
          variant='h1'
          style={{
            fontWeight: 900
          }}
        >
          {props.blog.title}
        </Typography>
      </Box>
    </Container>
  )
}

export default Blog

/** 服务端渲染 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context

  const res = await getBlogById(params?.id as string)

  // 博客未找到，返回404
  if (!res.data)
    return {
      notFound: true
    }

  return {
    props: {
      blog: res.data
    }
  }
}
