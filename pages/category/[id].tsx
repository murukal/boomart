// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
// mui
import { Pagination, Container } from '@mui/material'
// project
import { getEssays } from '../../apis/essay'
import type { Essay } from '../../typings/essay'

interface Props {
  essays: Essay[]
  page: number
  totalPages: number
}

const Category = (props: Props) => {
  const [page, setPage] = useState(props.page)
  const [totalPages, setTotalPages] = useState(props.totalPages)

  const router = useRouter()

  /** 分页改变 */
  const onPageChange = async (event: ChangeEvent<unknown>, page: number) => {
    const res = await onFetch(router.query.id as string, page)
    setPage(res.data?.page as number)
    setTotalPages(res.data?.totalPages as number)
  }

  return (
    <Container>
      <Pagination page={page} count={totalPages} onChange={onPageChange} />
    </Container>
  )
}

export default Category

/** 请求 */
const onFetch = async (tagId: string, page: number) => {
  return await getEssays({
    pagination: {
      page,
      limit: 10
    },
    tags: tagId
  })
}

/** 服务端渲染 */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // 获取分类下的文章
  const res = params?.id && (await onFetch(params.id.toString(), 1))

  console.log('res====', res)

  // 请求失败
  if (!res)
    return {
      notFound: true
    }

  // 请求成功
  return {
    props: {
      essays: res.data?.docs,
      page: res.data?.page,
      totalPages: res.data?.totalPages
    }
  }
}
