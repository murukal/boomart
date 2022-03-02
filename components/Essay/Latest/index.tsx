// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// nextjs
import { useRouter } from 'next/router'
// mui
import { Box, Container, Grid, Typography, Divider, Card, CardMedia, CardContent, Pagination } from '@mui/material'
// project
import Tags from '../Tags'
import Signature from '../Signature'
import Markers from '../Markers'
import { onFetchLatest } from '../assets'
import type { Tag } from '../../../typings/tag'
import type { Props } from './assets'

const Latest = (props: Props) => {
  const [essays, setEssays] = useState(props.essays)
  const [totalPages, setTotalPages] = useState(props.totalPages)

  const router = useRouter()

  /** 跳转分页 */
  const onPageChange = async (event: ChangeEvent<unknown>, page: number) => {
    const { essays, totalPages } = await onFetchLatest(page)
    setEssays(essays)
    setTotalPages(totalPages)
  }

  /** 路由跳转 */
  const onGo2Essay = (id: string) => () => {
    router.push(`/essay/${id}`)
  }

  return (
    <Box className={props.className}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Typography>最近发布的文章</Typography>
            <Divider className='mt-2.5' />

            {/* 文章列表 */}
            {essays.map((essay) => {
              const tags = essay.tags as Tag[]

              return (
                <Card className='flex mt-7 bg-gray-50' key={essay._id} elevation={0}>
                  <CardMedia
                    className='rounded-r cursor-pointer'
                    component='img'
                    height={150}
                    image={essay.cover || tags[0]?.cover}
                    alt={essay.title}
                    sx={{
                      flex: 1
                    }}
                    onClick={onGo2Essay(essay._id)}
                  />
                  <CardContent
                    className='px-4 self-center'
                    sx={{
                      flex: 2
                    }}
                  >
                    <Tags className='mb-3' tags={tags} />

                    {/* 文章标题 */}
                    <Typography className='cursor-pointer' variant='h5'>
                      {essay.title}
                    </Typography>

                    {/* 文章署名 */}
                    <Signature className='mt-5' essay={essay} />
                  </CardContent>

                  <Markers />
                </Card>
              )
            })}

            {/* 分页 */}
            <Pagination className='mt-7' count={totalPages} color='primary' onChange={onPageChange} />
          </Grid>

          <Grid item xs={4}>
            <Typography>最新的评论</Typography>
            <Divider className='mt-2.5' />

            {/* 评论列表 */}
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Latest
