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
import type { Essay } from '../../typings/essay'

interface Props {
  essays: Essay[]
  totalPages: number
}

const Category = (props: Props) => {
  const [totalPages, setTotalPages] = useState(props.totalPages)

  const router = useRouter()

  /** 分页改变 */
  const onPageChange = async (event: ChangeEvent<unknown>, page: number) => {
    const res = await onFetch(router.query.id as string, page)
    setTotalPages(res.data?.totalPages as number)
  }

  return (
    <Container>
      {props.essays.map((essay) => (
        <Wrapper key={essay._id} essay={essay} />
      ))}

      <Pagination className='mt-7' count={totalPages} onChange={onPageChange} color='primary' />
    </Container>
  )
}

export default Category

/** 请求 */
const onFetch = (tagId: string, page: number) =>
  getEssays({
    pagination: {
      page,
      limit: 10
    },
    populate: ['tags', 'createdBy'],
    tags: tagId
  })

/** 服务端渲染 */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // 获取分类下的文章
  const res = params?.id && (await onFetch(params.id.toString(), 1))

  // 请求失败
  if (!res)
    return {
      notFound: true
    }

  // 请求成功
  return {
    props: {
      essays: res.data?.docs,
      totalPages: res.data?.totalPages
    }
  }
}
