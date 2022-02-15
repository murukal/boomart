// mui
import { Box, Card, Typography, CardMedia, CardContent, TextField, Button } from '@mui/material'
import { useCallback } from 'react'
// project
import { getTitleStyle } from '../../../layouts/Footer/assets'
import type { Props } from './assets'

const Comments = (props: Props) => {
  const getComments = useCallback(
    (className?: string) => {
      return (
        <Card className={`mt-7 flex ${className}`} elevation={0}>
          <CardMedia className='rounded-full w-14 h-14' component='img' image='' alt='测试' />
          <CardContent className='ml-5 p-0'>
            <Typography fontSize={15} color='#777777'>
              Vestibulum euismod, leo eget varius gravida, eros enim interdum urna, non rutrum enim ante quis metus.
              Duis porta ornare nulla ut bibendum
            </Typography>

            <Box className='mt-3 flex items-center'>
              <Typography variant='h6' color='#2a2a2a'>
                Rosie
              </Typography>
              <Typography className='ml-5' color='#999999'>
                6 minutes ago{' '}
              </Typography>
              <Typography className='ml-auto'>Reply</Typography>
            </Box>
          </CardContent>
        </Card>
      )
    },
    [props.comments]
  )

  return (
    <Box className={props.className}>
      <Typography sx={getTitleStyle}>comments</Typography>

      {/* 评论列表 */}
      {getComments()}

      {/* 发表评论 */}
      <Typography className='mt-20' sx={getTitleStyle}>
        发表评论
      </Typography>

      <TextField className='mt-7 w-full' label='友善的评论' multiline rows={3} />

      <Button className='mt-7 rounded-3xl' variant='contained'>
        发表评论
      </Button>
    </Box>
  )
}

export default Comments
