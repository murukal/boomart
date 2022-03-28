// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// mui
import { Box, Container, Grid, Typography, Divider, Pagination } from '@mui/material'
// project
import Wrapper from '../Wrapper'
import type { Props } from '.'

const Latest = (props: Props) => {
  /** state */
  const [page, setPage] = useState(1)

  /** 事件 */
  const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <Box className={props.className}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Typography>最近发布的文章</Typography>
            <Divider className='mt-2.5' />

            {/* 文章列表 */}
            {props.essays.map((essay) => (
              <Wrapper key={essay.id} essay={essay} />
            ))}

            {/* 分页 */}
            <Pagination className='mt-7' count={props.pageCount} color='primary' onChange={onPageChange} />
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
