// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// mui
import { Box, Container, Grid, Typography, Divider, Pagination } from '@mui/material'
// project
import Wrapper from '../Wrapper'
import { getEssays } from '~/apis/essay'
import type { Props } from '.'

const Latest = (props: Props) => {
  const [essays, setEssays] = useState(props.essays)

  /** 事件 */
  const onPageChange = async (e: ChangeEvent<unknown>, page: number) => {
    const result = await getEssays({
      paginateInput: {
        page,
        limit: 4
      }
    })

    result.data?.essays.items && setEssays(result.data?.essays.items)
  }

  return (
    <Box className={props.className}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography>最近发布的文章</Typography>
            <Divider className='mt-2.5' />

            {/* 文章列表 */}
            {essays.map((essay) => (
              <Wrapper key={essay.id} essay={essay} />
            ))}

            {/* 分页 */}
            <Pagination className='mt-7' count={props.pageCount} color='primary' onChange={onPageChange} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Latest
