// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// nextjs
import { useRouter } from 'next/router'
// mui
import { Box, Container, Grid, Typography, Divider, Pagination } from '@mui/material'
// project
import Wrapper from '../Wrapper'
import { onFetchLatest } from '../assets'
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
            {essays.map((essay) => (
              <Wrapper key={essay._id} essay={essay} />
            ))}

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
