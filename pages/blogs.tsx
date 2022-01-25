// react
import { useEffect } from 'react'
// next
import { GetServerSideProps } from 'next'
// mui
import { Box, Grid, Pagination } from '@mui/material'
// project
import BlogCard from '../components/BlogCard'
import { getBlogs } from '../apis/blog'

const Blogs = () => {
  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <Box className='flex flex-col h-full items-center'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BlogCard />
        </Grid>
        <Grid item xs={6}>
          <BlogCard />
        </Grid>
        <Grid item xs={6}>
          <BlogCard />
        </Grid>
        <Grid item xs={6}>
          <BlogCard />
        </Grid>
      </Grid>
      <Pagination className='mt-auto' count={10} size='large' />
    </Box>
  )
}

export default Blogs

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getBlogs()

  return {
    props: {
      blogs: res.data
    }
  }
}
