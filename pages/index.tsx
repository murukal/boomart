// react
import { createRef, useEffect } from 'react'
// next
import Image from 'next/image'
// mui
import { Box, Button, Container, Input, Typography } from '@mui/material'
// project
import Latest from '../components/Blog/Latest'
import Hot from '../components/Blog/Hot'
import Footer from '../components/Home/Footer'
import featured from '../public/featured.png'
import { setTypedUI } from '../utils/ui'
import { getBlogBrowseTop } from '../apis/trigger-event'
import { onFetchLatest } from '../components/Blog/assets'
import type { TopResults } from '../typings/trigger-event'
import type { LatestResult } from '../components/Blog/assets'

interface Props {
  latestResult: LatestResult
  blogBrowseTopResults: TopResults
  likeTopResults: TopResults
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
              Halo, I’m{' '}
              <Typography
                variant='h2'
                style={{
                  color: '#5869DA',
                  fontWeight: 900
                }}
                component='span'
              >
                tutu
              </Typography>
            </Typography>

            <Typography className='mt-6' variant='h3'>
              欢迎来到我的博客站点
            </Typography>

            <Typography className='mt-6' variant='h5'>
              您可以使用您的邮箱来订阅最新的消息推送
            </Typography>

            {/* 订阅组件 */}
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
      <Hot className='py-8' browseTopResults={props.blogBrowseTopResults} likeTopResults={props.likeTopResults} />

      {/* 最近发布 博客 + 评论列表 */}
      <Latest className='bg-gray-50 py-8' blogs={props.latestResult.blogs} totalPages={props.latestResult.totalPages} />

      {/* 底部 */}
      <Footer className='pt-12 pb-5' />
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
  const latestResult = await onFetchLatest()
  const blogBrowseTopResults = (await getBlogBrowseTop({ limit: 4 })).data || []

  return {
    props: {
      latestResult,
      blogBrowseTopResults,
      likeTopResults: []
    }
  }
}
