// react
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
// next
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
// mui
import { Pagination, Container, Box, Typography } from '@mui/material'
// project
import Wrapper from '~/components/Essay/Wrapper'
import { getEssays } from '~/apis/essay'
import Navigations from '~/components/Navigations'
import layoutStyles from '~/layouts/Layout/Layout.module.css'
import { getNavigations } from '~/apis/navigation'
import type { Essay } from '~/typings/essay'
import type { Navigation } from '~/typings/navigation'

interface Props {
  essays: Essay[]
  essayPageCount: number

  navigations: Navigation[]
  navigationPageCount: number
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

  /**
   * 文章分页发生变更的回调事件
   * 重新获取文章列表
   */
  const onEssayPageChange = async (e: ChangeEvent<unknown>, page: number) => {
    const result = await getEssays({
      filterInput: {
        tagIds: [Number(id)]
      },
      paginateInput: {
        page,
        limit: 5
      }
    })

    setEssays(result.data?.essays.items || [])
    setEssayPageCount(result.data?.essays.pageCount || 0)
  }

  /**
   * 导航分页发生变更的回调事件
   * 重新获取导航列表
   */

  return (
    <Container
      sx={{
        paddingTop: '28px'
      }}
    >
      {/* 文章板块 */}
      <Typography className={layoutStyles['plate-title'] + ' mb-7'}>文章</Typography>

      <Box className='mb-7'>
        {essays.map((essay) => (
          <Wrapper key={essay.id} essay={essay} className='mb-7' />
        ))}
        <Pagination count={essayPageCount} color='primary' onChange={onEssayPageChange} />
      </Box>

      {/* 导航板块 */}
      <Typography className={layoutStyles['plate-title'] + ' mb-7'}>导航</Typography>

      <Navigations navigations={props.navigations} navigationPageCount={props.navigationPageCount} />
    </Container>
  )
}

export default Category

/**
 * 服务端渲染
 */
export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  // category id 不是数字，页面404
  const id = Number(params?.id)

  if (isNaN(id))
    return {
      notFound: true
    }

  // 获取当前分类下的文章列表
  const { data: essays } = await getEssays({
    filterInput: {
      tagIds: [id]
    },
    paginateInput: {
      limit: 5
    }
  })

  // 获取当前分类下的导航列表
  const { data: navigations } = await getNavigations({
    filterInput: {
      tagIds: [id]
    }
  })

  // 生成服务端参数，以props的方式传递给客户端
  return {
    props: {
      essays: essays?.essays.items || [],
      essayPageCount: essays?.essays.pageCount || 0,

      navigations: navigations?.navigations.items || [],
      navigationPageCount: navigations?.navigations.pageCount || 0
    }
  }
}
