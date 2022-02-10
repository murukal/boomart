// react
import { createRef, useCallback, useEffect } from 'react'
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
  Divider
} from '@mui/material'
import { LabelOutlined } from '@mui/icons-material'
import type { SxProps } from '@mui/material'
// third
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import dayjs from 'dayjs'
// project
import featured from '../public/featured.png'
import { setTypedUI } from '../utils/ui'
import { getBlogs } from '../apis/blog'
import { getBlogBrowseTop } from '../apis/trigger-event'
import type { TopResults } from '../typings/trigger-event'
import type { Tag } from '../typings/tag'
import type { Blog } from '../typings/blog'
import type { User } from '../typings/user'

interface Props {
  blogs: Blog[]
  blogBrowseTopResults: TopResults
}

const subScriptStyles: SxProps = {
  content: '""',
  width: 3,
  height: 3,
  background: '#999',
  position: 'absolute',
  right: 0,
  bottom: 3,
  borderRadius: '50%'
}

const blogTitleStyles: CSSProperties = {
  fontSize: 20,
  fontWeight: 700
}

const Home = (props: Props) => {
  const ref = createRef<HTMLSpanElement>()

  /** 博客卡片的点击事件 */
  const onCardClick = (id: string) => () => {}

  useEffect(() => {
    // 返回的函数传递给Effect，取消订阅
    return setTypedUI(ref)
  }, [])

  /** tags渲染组建 */
  const getTagComponents = useCallback(
    (tags: Tag[]) => (
      <Box className='mb-2.5'>
        {tags.map((tag) => (
          <Typography
            key={tag._id}
            className='mr-2.5'
            component='span'
            sx={{
              paddingRight: '7px',
              position: 'relative',
              '&::after': subScriptStyles
            }}
          >
            {tag.name}
          </Typography>
        ))}
      </Box>
    ),
    []
  )

  /** 博客署名栏 */
  const getBlogSignature = useCallback((blog: Blog) => {
    const createdBy = blog.createdBy as User

    const textStyles: SxProps = {
      position: 'relative',
      color: '#666',
      fontSize: 10
    }

    return (
      <Box className='mt-5'>
        <Typography
          className='uppercase pr-2.5 mr-2.5'
          component='span'
          sx={{
            ...textStyles,
            '&::after': {
              ...subScriptStyles,
              top: '50%'
            }
          }}
        >
          {dayjs(blog.createdAt).format('D MMM')}
        </Typography>
        <Typography component='span' sx={textStyles}>{`By ${createdBy.username}`}</Typography>
      </Box>
    )
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
      <Container>
        <Box className='flex justify-between my-7'>
          <Typography className='ml-4'>当前热门的博客🔥</Typography>

          <Box className='flex items-center'>
            <LabelOutlined fontSize='small' />
            <Typography className='mr-4'>热门标签：</Typography>
          </Box>
        </Box>

        {/* 热门博客cards */}
        <Box>
          <Grid container>
            <Grid className='px-4 mb-8' item xs={8}>
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
                <Grid className='px-4 mb-8' key={topResult.target._id} item xs={4}>
                  <Card className='h-96' onClick={onCardClick(topResult.target._id)}>
                    <CardMedia
                      component='img'
                      height='200'
                      image={topResult.target.cover || tags[0]?.cover}
                      alt='Paella dish'
                    />
                    <CardContent className='p-7'>
                      {getTagComponents(tags)}
                      <Typography style={blogTitleStyles}>{topResult.target.title}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Container>

      {/* 博客列表 */}
      <Box className='bg-gray-50'>
        <Container>
          <Grid container>
            <Grid item className='px-4 mt-7' xs={8}>
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
                      {getTagComponents(tags)}
                      <Typography style={blogTitleStyles}>{blog.title}</Typography>

                      {/* 博客署名 */}
                      {getBlogSignature(blog)}
                    </CardContent>
                  </Card>
                )
              })}
            </Grid>

            <Grid item className='px-4 mt-7' xs={4}>
              <Typography>最新的评论</Typography>
              <Divider className='mt-2.5' />

              {/* 评论列表 */}
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
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
