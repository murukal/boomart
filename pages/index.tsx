// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import { GetServerSideProps } from 'next'
// mui
import { Box, Pagination } from '@mui/material'
import { Masonry } from '@mui/lab'
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
    <div className='w-full h-full flex'>
      <Box className='flex-1 flex flex-col h-full items-center'>
        <Masonry className='flex-1 h-0 content-start' columns={3} spacing={2}>
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </Masonry>

        <Pagination className='my-3' count={pageCount} page={pageCurrent} size='large' onChange={onPageChange} />
      </Box>

      <SitePush></SitePush>
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
