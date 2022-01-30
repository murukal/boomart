// react
import type { ChangeEvent } from 'react'
import { useState } from 'react'
// next
import { GetServerSideProps } from 'next'
// mui
import { Box, Pagination } from '@mui/material'
import { Masonry } from '@mui/lab'
// project
import type { Blog } from '../typings/blog'
import BlogCard from '../components/BlogCard'
import { getBlogs } from '../apis/blog'

interface Props {
  blogs: Blog[]
  pageCount: number
  pageCurrent: number
}

const onFetch = async (page = 1) => {
  const res = await getBlogs({
    pagination: {
      page,
      limit: 10,
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
    <Box className='flex flex-col h-full items-center'>
      <Masonry className='flex-1' columns={4} spacing={2}>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </Masonry>

      <Pagination className='my-3' count={pageCount} page={pageCurrent} size='large' onChange={onPageChange} />
    </Box>
  )
}

export default Blogs

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const props = await onFetch()

  return {
    props
  }
}
