// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
// mui
import { Pagination, Container } from '@mui/material'
// project
import Wrapper from '../../components/Essay/Wrapper'
import { getEssays } from '../../apis/essay'
import { Essay } from '../../typings/essay'

const Category = () => {
  const [page, setPage] = useState(1)
  const tagEssays: Essay[] = []

  // 分页发生变更的回调事件
  const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <Container>
      {tagEssays.map((essay) => (
        <Wrapper key={essay.id} essay={essay} />
      ))}

      <Pagination className='mt-7' count={10} color='primary' onChange={onPageChange} />
    </Container>
  )
}

export default Category

/** 服务端渲染 */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      tagEssays: params?.id ? (await getEssays(1, 10, Number(params?.id))).data?.essays : []
    }
  }
}
