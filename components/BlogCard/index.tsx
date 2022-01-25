// mui
import { useTheme, Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import { SkipPrevious, PlayArrow, SkipNext } from '@mui/icons-material'
// next
import { useRouter } from 'next/router'
// project
import type { Props } from './assets'

const BlogCard = (props: Props) => {
  const theme = useTheme()
  const router = useRouter()

  const onCardClick = () => router.push(`/blog/${props.blog._id}`)

  return (
    <Card sx={{ display: 'flex' }} onClick={onCardClick}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5'>
            {props.blog.title}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary' component='div'>
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label='previous'>{theme.direction === 'rtl' ? <SkipNext /> : <SkipPrevious />}</IconButton>
          <IconButton aria-label='play/pause'>
            <PlayArrow sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label='next'>{theme.direction === 'rtl' ? <SkipPrevious /> : <SkipNext />}</IconButton>
        </Box>
      </Box>
      <CardMedia component='img' sx={{ width: 20 }} alt='Live from space album cover' />
    </Card>
  )
}

export default BlogCard
