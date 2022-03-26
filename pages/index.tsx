// react
import { createRef, useEffect } from 'react'
// next
import Image from 'next/image'
// mui
import { Box, Container, Typography, Input, Button } from '@mui/material'
// project
import Hot from '../components/Essay/Hot'
import Latest from '../components/Essay/Latest'
import featured from '../public/featured.png'
import { setTypedUI } from '../utils/ui'
import { GetServerSideProps } from 'next'
import { getEssays } from '../apis/essay'
import { getTopEssays, Type } from '../apis/toggle'
import { PaginateOutput } from '../typings/api'
import { Essay } from '../typings/essay'

interface Props {
  latestEssayProps: PaginateOutput<Essay> | null
  browseTopEssays: Essay[] | null
  likeTopEssays: Essay[] | null
}

const Home = (props: Props) => {
  const ref = createRef<HTMLSpanElement>()

  useEffect(() => {
    // 返回的函数传递给Effect，取消订阅
    return setTypedUI(ref)
  }, [])

  return (
    <>
      {/* featured */}
      <Box
        className='py-20'
        sx={{
          backgroundColor: '#f1f2f3'
        }}
      >
        <Container className='flex'>
          {/* 左侧 */}
          <Box className='flex-1'>
            <Box className='mb-4'>
              <Typography
                component='span'
                ref={ref}
                sx={{
                  color: '#687385',
                  borderRight: 1,
                  borderRightColor: '#687385'
                }}
              />
            </Box>

            <Typography
              variant='h2'
              style={{
                fontWeight: 900
              }}
            >
              Halo, I’m
              <Typography
                variant='h2'
                style={{
                  color: '#5869DA',
                  fontWeight: 900,
                  marginLeft: 12
                }}
                component='span'
              >
                tutu
              </Typography>
            </Typography>

            <Typography className='mt-6' variant='h3'>
              欢迎来到我的技术分享
            </Typography>

            {/* 订阅组件 */}
            <Typography className='mt-6' variant='h5'>
              您可以使用您的邮箱来订阅最新的消息推送
            </Typography>

            <Box className='mt-7 flex'>
              <Input
                disableUnderline
                placeholder='请输入您的邮箱'
                inputProps={{
                  style: {
                    height: 14,
                    padding: '16px 24px',
                    border: '1px solid rgb(229 229 229)',
                    borderTopLeftRadius: 24,
                    borderBottomLeftRadius: 24,
                    backgroundColor: 'white',
                    width: 300
                  }
                }}
              ></Input>
              <Button
                className='rounded-l-none rounded-r-3xl'
                disableElevation
                variant='contained'
                sx={{
                  width: 120
                }}
              >
                订阅
              </Button>
            </Box>
          </Box>

          {/* 右侧 */}
          <Box className='flex-1 flex justify-center'>
            <Image src={featured} alt='featured' priority={true} />
          </Box>
        </Container>
      </Box>

      {/* 热门榜单 */}
      <Hot className='py-8' browseTopEssays={props.browseTopEssays} likeTopEssays={props.likeTopEssays} />

      {/* 最近发布 文章 + 评论列表 */}
      <Latest
        className='bg-gray-50 py-8'
        essays={props.latestEssayProps?.items || []}
        pageCount={props.latestEssayProps?.pageCount || 0}
      />
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  // 获取浏览量最高的文章
  const browseTopEssayResult = await getTopEssays(Type.browse)

  // 获取点赞量最高的文章
  const likeTopEssayResult = await getTopEssays(Type.like)

  // 获取最近更新的文章
  const latestEssayResult = await getEssays()

  return {
    props: {
      latestEssayProps: latestEssayResult.data?.essays || null,
      browseTopEssays: browseTopEssayResult.data?.topEssays || null,
      likeTopEssays: likeTopEssayResult.data?.topEssays || null
    }
  }
}
