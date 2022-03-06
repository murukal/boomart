// react
import { createRef, useEffect } from 'react'
// next
import { useRouter } from 'next/router'
import Image from 'next/image'
// mui
import { Box, Container, Typography, Input, Button } from '@mui/material'
// project
import Latest from '../components/Essay/Latest'
import Hot from '../components/Essay/Hot'
import featured from '../public/featured.png'
import { setTypedUI } from '../utils/ui'
import { getEssayBrowseTop } from '../apis/toggle'
import { onFetchLatest } from '../components/Essay/assets'
import type { TopResults } from '../typings/toggle'
import type { LatestResult } from '../components/Essay/assets'
import { getCsrfToken, getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

interface Props {
  latestResult: LatestResult
  browseTopResults: TopResults
  likeTopResults: TopResults
}

const Home = (props: Props) => {
  const router = useRouter()
  const ref = createRef<HTMLSpanElement>()

  const onGo2Essay = (id: string) => () => {
    router.push(`/essay/${id}`)
  }

  useEffect(() => {
    // 返回的函数传递给Effect，取消订阅
    return setTypedUI(ref)
  }, [props])

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
      <Hot
        className='py-8'
        browseTopResults={props.browseTopResults}
        likeTopResults={props.likeTopResults}
        onClick={onGo2Essay}
      />

      {/* 最近发布 文章 + 评论列表 */}
      <Latest
        className='bg-gray-50 py-8'
        essays={props.latestResult.essays}
        totalPages={props.latestResult.totalPages}
      />
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const latestResult = await onFetchLatest()
  const browseTopResults = (await getEssayBrowseTop({ limit: 4 })).data || []

  const csrfToken = await getSession(context)

  console.log('csrfToken===', csrfToken)

  return {
    props: {
      latestResult,
      browseTopResults,
      likeTopResults: []
    }
  }
}
