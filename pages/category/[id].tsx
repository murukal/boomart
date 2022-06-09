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
import Essays from '~/components/Essays'

interface Props {
  essays: Essay[]
  essayPageCount: number

  navigations: Navigation[]
  navigationPageCount: number
}

const Category = (props: Props) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Container
      sx={{
        paddingTop: '28px'
      }}
    >
      {/* 文章板块 */}
      <Typography className={layoutStyles['plate-title'] + ' mb-7'}>文章</Typography>
      <Essays essays={props.essays} pageCount={props.essayPageCount} tagIds={[Number(id)]} />

      {/* 导航板块 */}
      <Typography className={layoutStyles['plate-title'] + ' mb-7'}>导航</Typography>
      <Navigations navigations={props.navigations} pageCount={props.navigationPageCount} />
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
