// react
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import type { GetServerSideProps } from 'next'
// mui
import { Pagination, Container, Box } from '@mui/material'
// project
import Wrapper from '~/components/Essay/Wrapper'
import { getEssays } from '~/apis/essay'
import type { Essay } from '~/typings/essay'
import { useRouter } from 'next/router'

interface Props {
  essays: Essay[]
  essayPageCount: number
}

const Category = (props: Props) => {
  const router = useRouter()
  const { id } = router.query

  const [essays, setEssays] = useState(props.essays || [])
  const [essayPageCount, setEssayPageCount] = useState(props.essayPageCount || 0)

  useEffect(() => {
    setEssays(props.essays || [])
    setEssayPageCount(props.essayPageCount || 0)
  }, [props])

  // 分页发生变更的回调事件
  const onEssayPageChange = async (e: ChangeEvent<unknown>, page: number) => {
    const result = await getEssays(
      {
        tagIds: [Number(id)]
      },
      {
        page,
        limit: 5
      }
    )

    setEssays(result.data?.essays.items || [])
    setEssayPageCount(result.data?.essays.pageCount || 0)
  }

  return (
    <Container>
      {/* 文章板块 */}
      <Box>
        {essays.map((essay) => (
          <Wrapper key={essay.id} essay={essay} />
        ))}

        <Pagination className='mt-7' count={essayPageCount} color='primary' onChange={onEssayPageChange} />
      </Box>
    </Container>
  )
}

export default Category

/** 服务端渲染 */
export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  // category id 不是数字，页面404
  const id = Number(params?.id)

  if (isNaN(id))
    return {
      notFound: true
    }

  // 服务端渲染首次执行
  const result = await getEssays(
    {
      tagIds: [Number(params?.id)]
    },
    {
      page: 1,
      limit: 5
    }
  )

  // 生成服务端参数，以props的方式传递给客户端
  return {
    props: {
      essays: result.data?.essays.items || [],
      essayPageCount: result.data?.essays.pageCount || 0
    }
  }
}
