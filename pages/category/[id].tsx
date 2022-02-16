// react
import { useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
// mui
import { Pagination, Container } from '@mui/material'
// project
import { getBlogs } from '../../apis/blog'
import type { Blog } from '../../typings/blog'

interface Props {
  blogs: Blog[]
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
  return await getBlogs({
    pagination: {
      page
    },
    tag: tagId
  })
}

/** 服务端渲染 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context

  // 获取分类下的文章
  const res = params?.id && (await onFetch(params?.id as string, 1))

  // 请求失败
  if (!res)
    return {
      notFound: true
    }

  // 请求成功
  return {
    props: {
      blogs: res.data?.docs,
      page: res.data?.page,
      totalPages: res.data?.totalPages
    }
  }
}
