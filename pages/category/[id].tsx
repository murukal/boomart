// next
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
// mui
import { Container, Typography } from '@mui/material'
// project
import { getEssays } from '~/apis/essay'
import { getNavigations } from '~/apis/navigation'
import Navigations from '~/components/Navigations'
import Essays from '~/components/Essays'
import layoutStyles from '~/layouts/Layout/Layout.module.css'
import type { Essay } from '~/typings/essay'
import type { Navigation } from '~/typings/navigation'
import { useMemo } from 'react'

interface Props {
  essays: Essay[]
  essayPageCount: number
  navigations: Navigation[]
  navigationPageCount: number
}

const Category = (props: Props) => {
  const router = useRouter()
  const { id } = router.query

  /**
   * 模块标题className
   */
  const titleClassName = useMemo(() => {
    return [layoutStyles['plate-title'], 'my-7'].join(' ')
  }, [])

  /**
   * UI
   */
  return (
    <Container>
      {/* 文章板块 */}
      {!!props.essayPageCount && (
        <>
          <Typography className={titleClassName}>文章</Typography>
          <Essays essays={props.essays} pageCount={props.essayPageCount} tagIds={[Number(id)]} />
        </>
      )}

      {/* 导航板块 */}
      {!!props.navigationPageCount && (
        <>
          <Typography className={titleClassName}>导航</Typography>
          <Navigations navigations={props.navigations} pageCount={props.navigationPageCount} tagIds={[Number(id)]} />
        </>
      )}
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
