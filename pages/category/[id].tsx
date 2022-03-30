// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import type { GetServerSideProps } from 'next'
// mui
import { Pagination, Container, Box, Typography } from '@mui/material'
// project
import Wrapper from '~/components/Essay/Wrapper'
import { getEssays } from '~/apis/essay'
import styles from '~/layouts/Layout/Layout.module.css'
import type { Essay } from '~/typings/essay'

interface Props {
  essays: Essay[]
  pageCount: number
}

const Category = (props: Props) => {
  const [page, setPage] = useState(1)

  // 分页发生变更的回调事件
  const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <Container>
      {/* 视频板块 */}
      <Box>
        <Typography className={styles['plate-title']}>视频</Typography>
      </Box>

      {/* 文章板块 */}
      <Box>
        <Typography className={styles['plate-title']}>文章</Typography>

        {props.essays.map((essay) => (
          <Wrapper key={essay.id} essay={essay} />
        ))}

        <Pagination className='mt-7' count={props.pageCount} color='primary' onChange={onPageChange} />
      </Box>
    </Container>
  )
}

export default Category

/** 服务端渲染 */
export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  // category id 不存在，页面404
  if (!params?.id)
    return {
      notFound: true
    }

  const result = await getEssays(
    {
      tagIds: [Number(params.id)]
    },
    {
      page: 1,
      limit: 10
    }
  )

  return {
    props: {
      essays: result.data?.essays.items || [],
      pageCount: result.data?.essays.pageCount || 0
    }
  }
}
