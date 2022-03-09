// nextjs
import { useRouter } from 'next/router'
// mui
import { Box, Container, Grid, Typography, Divider, Pagination } from '@mui/material'
// project
import Wrapper from '../Wrapper'
import type { Props } from './assets'
import useSWR from 'swr'
import { apis } from '../../../apis'

const Latest = (props: Props) => {
  const router = useRouter()
  const { data: latestResult } = useSWR(['/api/essay/latest', 1], apis['/api/essay/latest'])
  const essyas = latestResult?.data?.docs || []
  const totalPages = latestResult?.data?.totalPages || 0

  console.log('data====', latestResult)

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
            {essyas.map((essay) => (
              <Wrapper key={essay._id} essay={essay} />
            ))}

            {/* 分页 */}
            <Pagination className='mt-7' count={totalPages} color='primary' />
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
