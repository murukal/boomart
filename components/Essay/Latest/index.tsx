// nextjs
import { useRouter } from 'next/router'
// mui
import { Box, Container, Grid, Typography, Divider, Pagination } from '@mui/material'
// project
import Wrapper from '../Wrapper'
import type { Props } from './assets'
import useSWR from 'swr'
import { apiKeys } from '../../../apis'
import { ApiResponse, PaginateResult } from '../../../typings/api'
import { Essay } from '../../../typings/essay'

const Latest = (props: Props) => {
  // hooks
  const { data: latestResult } = useSWR<ApiResponse<PaginateResult<Essay>>>([apiKeys.essay.latest.key, 1])

  // 读取变量
  const essyas = latestResult?.data?.docs || []
  const totalPages = latestResult?.data?.totalPages || 0

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
