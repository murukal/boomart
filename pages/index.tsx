// react
import { createRef, useEffect } from 'react'
import type { CSSProperties } from 'react'
// next
import Image from 'next/image'
// mui
import {
  Box,
  Button,
  Container,
  Input,
  Paper,
  Typography,
  Card,
  CardMedia,
  Grid,
  CardContent,
  Divider,
  Pagination,
  Link
} from '@mui/material'
import { LabelOutlined } from '@mui/icons-material'
import type { SxProps } from '@mui/material'
// third
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
// project
import TagsInBlog from '../components/Blog/Tags'
import Signature from '../components/Blog/Signature'
import featured from '../public/featured.png'
import beian from '../public/beian.png'
import { setTypedUI } from '../utils/ui'
import { getBlogs } from '../apis/blog'
import { getBlogBrowseTop } from '../apis/trigger-event'
import type { TopResults } from '../typings/trigger-event'
import type { Tag } from '../typings/tag'
import type { Blog } from '../typings/blog'

interface Props {
  blogs: Blog[]
  blogBrowseTopResults: TopResults
}

const blogTitleStyles: CSSProperties = {
  fontSize: 20,
  fontWeight: 700
}

const footerTitle: SxProps = {
  fontSize: '12px',
  textTransform: 'uppercase',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: '#eaecee',
  position: 'relative',
  paddingBottom: '12px',
  marginBottom: '16px',
  '&::after': {
    content: '""',
    backgroundColor: 'black',
    height: '3px',
    width: '50px',
    position: 'absolute',
    bottom: 0,
    left: 0
  }
}

const copyrightStyles: CSSProperties = {
  color: '#687385',
  fontSize: '12px',
  fontWeight: 400
}

const Home = (props: Props) => {
  const ref = createRef<HTMLSpanElement>()

  /** 博客卡片的点击事件 */
  const onCardClick = (id: string) => () => {}

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
              Halo, I’m Murukal
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

      {/* 热门的博客 */}
      <Container className='py-8'>
        {/* 热门博客cards */}
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Typography>当前热门的博客🔥</Typography>
          </Grid>

          <Grid item xs={4} className='flex items-center justify-end'>
            <LabelOutlined fontSize='small' />
            <Typography>热门标签：</Typography>
          </Grid>

          <Grid item xs={8}>
            <Swiper
              className='h-96'
              modules={[Autoplay]}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {[0, 1, 2, 3].map((item) => (
                <SwiperSlide className='flex justify-center items-center' key={item}>
                  <Paper className='bg-red-500 h-full flex-1' elevation={1}></Paper>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>

          {/* 排名后4 */}
          {props.blogBrowseTopResults.map((topResult) => {
            // 断言获取标签
            const tags = topResult.target.tags as Tag[]

            return (
              <Grid key={topResult.target._id} item xs={4}>
                <Card className='h-96' onClick={onCardClick(topResult.target._id)}>
                  <CardMedia
                    component='img'
                    height='200'
                    image={topResult.target.cover || tags[0]?.cover}
                    alt='Paella dish'
                  />
                  <CardContent className='p-7'>
                    <TagsInBlog className='mb-3' tags={tags} />
                    <Typography style={blogTitleStyles}>{topResult.target.title}</Typography>

                    {/* 博客署名 */}
                    <Signature className='mt-5' blog={topResult.target} />
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>

      {/* 博客 + 评论列表 */}
      <Box className='bg-gray-50 py-8'>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <Typography>最近发布的博客</Typography>
              <Divider className='mt-2.5' />

              {/* 博客列表 */}
              {props.blogs.map((blog) => {
                const tags = blog.tags as Tag[]

                return (
                  <Card className='flex mt-7 bg-gray-50' key={blog._id} elevation={0}>
                    <CardMedia
                      className='rounded-r'
                      component='img'
                      height={150}
                      image={blog.cover || tags[0]?.cover}
                      alt='Paella dish'
                      sx={{
                        flex: 1
                      }}
                    />
                    <CardContent
                      className='px-4 self-center'
                      sx={{
                        flex: 2
                      }}
                    >
                      <TagsInBlog className='mb-3' tags={tags} />
                      <Typography style={blogTitleStyles}>{blog.title}</Typography>

                      {/* 博客署名 */}
                      <Signature className='mt-5' blog={blog} />
                    </CardContent>
                  </Card>
                )
              })}

              {/* 分页 */}
              <Pagination className='mt-7' count={10} color='primary' />
            </Grid>

            <Grid item xs={4}>
              <Typography>最新的评论</Typography>
              <Divider className='mt-2.5' />

              {/* 评论列表 */}
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Container>
      </Box>

      {/* 底部 */}
      <Box component='footer' className='pt-12 pb-5'>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <Typography variant='h5' sx={footerTitle}>
                abount us
              </Typography>

              <Typography className='mb-3' style={copyrightStyles}>
                谁也阻挡不了一颗想要创作的心
              </Typography>

              <Typography
                className='mb-3'
                style={{
                  color: '#212529',
                  fontWeight: 700
                }}
              >
                邮箱地址
              </Typography>
              <Typography style={copyrightStyles}>fanfan: rrongpan@outlook.com</Typography>
              <Typography style={copyrightStyles}>tutu: jokerxxx222@126.com</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='h5' sx={footerTitle}>
                quick link
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h5' sx={footerTitle}>
                tags
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h5' sx={footerTitle}>
                newsletter
              </Typography>
            </Grid>
          </Grid>

          <Divider className='my-7' />

          {/* copyright */}
          <Box className='flex justify-between'>
            <Link
              target='_blank'
              rel='noreferrer'
              href='https://beian.miit.gov.cn'
              style={copyrightStyles}
              underline='none'
            >
              浙ICP备2021003835号
            </Link>

            <Link
              className='flex items-center'
              target='_blank'
              rel='noreferrer'
              href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902003160'
              style={copyrightStyles}
              underline='none'
            >
              <Image src={beian} alt='' />
              浙公网安备 33010902003160号
            </Link>
            <Typography style={copyrightStyles}>Copyright © 2022 by fanfan & tutu</Typography>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Home

export const onFetch = async () => {
  const res = await getBlogs({
    pagination: {
      limit: 4,
      page: 1,
      populate: ['tags', 'createdBy']
    }
  })

  return res.data?.docs || []
}

export const getServerSideProps = async () => {
  const blogs = await onFetch()
  const blogBrowseTopResults = (await getBlogBrowseTop({ limit: 4 })).data || []

  return {
    props: {
      blogs,
      blogBrowseTopResults
    }
  }
}
