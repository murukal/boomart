// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import { GetServerSideProps } from 'next'
// mui
import { Box, Pagination, Grid } from '@mui/material'
// project
import BlogCard from '../components/BlogCard'
import { getBlogs } from '../apis/blog'
import SitePush from '../components/SitePush'
import type { Blog } from '../typings/blog'

interface Props {
  blogs: Blog[]
  pageCount: number
  pageCurrent: number
}

const onFetch = async (page = 1) => {
  const res = await getBlogs({
    pagination: {
      page,
      limit: 9,
      populate: 'createdBy'
    }
  })

  return {
    blogs: res.data?.docs || [],
    pageCount: res.data?.totalPages || 0,
    pageCurrent: res.data?.page || page
  }
}

const Blogs = (props: Props) => {
  const [pageCount, setPageCount] = useState(props.pageCount)
  const [pageCurrent, setPageCurrent] = useState(props.pageCurrent)
  const [blogs, setBlogs] = useState(props.blogs)

  const onPageChange = async (e: ChangeEvent<unknown>, page: number) => {
    const props = await onFetch(page)
    setPageCount(props.pageCount)
    setPageCurrent(props.pageCurrent)
    setBlogs(props.blogs)
  }

  return (
    <div className='w-full h-full flex'>
      <Box className='flex-1 w-0 flex flex-col h-full items-center mr-2'>
        <Box className='flex-1 h-0'>
          <Grid container spacing={1}>
            {blogs.map((blog) => (
              <Grid key={blog._id} item xs={4}>
                <BlogCard key={blog._id} blog={blog} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Pagination className='my-3' count={pageCount} page={pageCurrent} size='large' onChange={onPageChange} />
      </Box>

      <SitePush />
    </div>
  )
}

export default Blogs

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const props = await onFetch()

  return {
    props
  }
}
