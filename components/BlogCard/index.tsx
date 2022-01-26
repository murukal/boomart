// mui
import { Card, CardContent, Typography } from '@mui/material'
// next
import { useRouter } from 'next/router'
// project
import type { Props } from './assets'

const BlogCard = (props: Props) => {
  const router = useRouter()

  const onCardClick = () => router.push(`/blog/${props.blog._id}`)

  return (
    <Card className='flex' onClick={onCardClick}>
      <CardContent>
        <Typography component='div' variant='h5'>
          {props.blog.title}
        </Typography>
        <Typography variant='subtitle1' color='text.secondary' component='div'></Typography>
      </CardContent>
    </Card>
  )
}

export default BlogCard
