// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
// mui
import { Pagination, Container } from '@mui/material'
// third
import useSWR, { unstable_serialize } from 'swr'
// project
import Wrapper from '../../components/Essay/Wrapper'
import { getTagEssays } from '../../apis/essay'

const Category = () => {
  const [page, setPage] = useState(1)

  // hooks
  const router = useRouter()
  const { data: tagEssaysRes } = useSWR(['/api/essay/tag', router.query.id, page], (key, tagId: string, page: number) => getTagEssays(tagId, page))

  // 分页发生变更的回调事件
  const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <Container>
      {(tagEssaysRes?.data?.docs || []).map((essay) => (
        <Wrapper key={essay._id} essay={essay} />
      ))}

      <Pagination className='mt-7' count={tagEssaysRes?.data?.totalPages} color='primary' onChange={onPageChange} />
    </Container>
  )
}

export default Category

/** 服务端渲染 */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      fallback: {
        [unstable_serialize(['/api/essay/tag', params?.id, 1])]: await getTagEssays(params?.id as string)
      }
    }
  }
}
