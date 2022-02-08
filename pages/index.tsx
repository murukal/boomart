// next
import Image from 'next/image'
// mui
import { Box, Button, Container, Input, Paper, Typography, Card, CardMedia, Grid } from '@mui/material'
import { LabelOutlined } from '@mui/icons-material'
// third
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
// project
import featured from '../public/featured.png'
import { width } from '@mui/system'

const Home = () => {
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
            <Image src={featured} alt='featured' />
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
            {[0, 1, 2, 3].map((item) => (
              <Grid className='px-4 mb-8' key={item} item xs={4}>
                <Card className='h-96'>
                  <CardMedia component='img' height='194' image='/static/images/cards/paella.jpg' alt='Paella dish' />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Home
