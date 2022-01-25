// react
import { useEffect, useState } from 'react'
// next
import { GetServerSideProps } from 'next'
// mui
import { Box, Grid, Pagination } from '@mui/material'
// project
import type { Blog } from '../typings/blog'
import BlogCard from '../components/BlogCard'
import { getBlogs } from '../apis/blog'

interface Props {
  blogs: Blog[]
  pageCount: number
  pageCurrent: number
}

const Blogs = (props: Props) => {
  const [pageCount, setPageCount] = useState(props.pageCount)
  const [pageCurrent, setPageCurrent] = useState(props.pageCurrent)
  const [blogs, setBlogs] = useState(props.blogs)

  useEffect(() => {}, [])

  return (
    <Box className='flex flex-col h-full items-center'>
      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid item xs={6} key={blog._id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        className='mt-auto'
        count={pageCount}
        page={pageCurrent}
        size='large'
        onChange={(e, page) => {
          console.log('e====', e)
          console.log('page===', page)
        }}
      />
    </Box>
  )
}

export default Blogs

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await getBlogs()

  return {
    props: {
      blogs: res.data?.docs || [],
      pageCount: res.data?.totalPages || 0,
      pageCurrent: res.data?.page || 0
    }
  }
}
