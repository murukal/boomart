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
   * 文章模块className
   */
  const essayClassName = useMemo(() => {
    const classNames = [layoutStyles['plate-title'], 'mb-7']
    return classNames.join(' ')
  }, [])

  /**
   * 导航模块className
   */
  const navigationClassName = useMemo(() => {
    const classNames = [layoutStyles['plate-title'], 'mb-7']

    // 上方存在文章模块，设置外边距
    if (props.essayPageCount) {
      classNames.push('mt-7')
    }

    return classNames.join(' ')
  }, [props.essayPageCount])

  /**
   * UI
   */
  return (
    <Container className='pt-7'>
      {/* 文章板块 */}
      {!!props.essayPageCount && (
        <>
          <Typography className={essayClassName}>文章</Typography>
          <Essays essays={props.essays} pageCount={props.essayPageCount} tagIds={[Number(id)]} />
        </>
      )}

      {/* 导航板块 */}
      {!!props.navigationPageCount && (
        <>
          <Typography className={navigationClassName}>导航</Typography>
          <Navigations navigations={props.navigations} pageCount={props.navigationPageCount} />
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
