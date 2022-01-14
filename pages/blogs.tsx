// mui
import { Box, Grid, Pagination } from '@mui/material'
// project
import BlogCard from '../components/BlogCard'

const Blogs = () => {
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
