// react
import { useMemo } from 'react'
// mui
import { Container, Grid, Typography, Paper, Card, CardMedia, CardContent, Box } from '@mui/material'
import { LabelOutlined } from '@mui/icons-material'
// third
import { Autoplay, EffectFade, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { uniqBy } from 'lodash'
// project
import Tags from '../Tags'
import Signature from '../Signature'
import Actions from '../Actions'
import { getHotTagStyle } from './assets'
import type { Props } from './assets'
import type { Tag } from '../../../typings/tag'

const Hot = (props: Props) => {
  // 抽离tags
  const hotTags = useMemo<Tag[]>(() => {
    const tags = [...props.browseTopResults, ...props.likeTopResults].reduce((previous, topResult) => {
      return previous.concat(topResult.target.tags as Tag[])
    }, [] as Tag[])

    return uniqBy(tags, '_id')
  }, [props.browseTopResults, props.likeTopResults])

  return (
    <Container className={props.className}>
      {/* 热门博客cards */}
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Typography>当前热门的博客🔥</Typography>
        </Grid>

        <Grid item xs={4} className='flex items-center justify-end'>
          <LabelOutlined fontSize='small' />

          <Typography className='ml-1'>热门标签：</Typography>

          {hotTags.map((tag) => (
            <Typography sx={getHotTagStyle} key={tag._id} component='span' color={(theme) => theme.palette.muted?.main}>
              {tag.name}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={8}>
          <Swiper
            className='h-full'
            modules={[Autoplay, EffectFade, Navigation]}
            // slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            autoplay={true}
            effect='fade'
            // navigation={true}
          >
            {[0, 1, 2, 3].map((item) => (
              <SwiperSlide className='flex justify-center items-center' key={item}>
                <Paper className='bg-red-500 h-full flex-1' elevation={1}></Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        {/* 排名后4 */}
        {props.browseTopResults.map((topResult) => {
          // 断言获取标签
          const tags = topResult.target.tags as Tag[]

          return (
            <Grid key={topResult.target._id} item xs={4}>
              <Card>
                <CardMedia
                  className='cursor-pointer'
                  component='img'
                  height='200'
                  image={topResult.target.cover || tags[0]?.cover}
                  alt={topResult.target.title}
                  onClick={props.onClick && props.onClick(topResult.target._id)}
                />
                <Box className='flex justify-between'>
                  <CardContent className='p-7'>
                    <Tags className='mb-3' tags={tags} />

                    {/* 博客标题 */}
                    <Typography className='cursor-pointer' variant='h5' onClick={props.onClick && props.onClick(topResult.target._id)}>
                      {topResult.target.title}
                    </Typography>

                    {/* 博客署名 */}
                    <Signature className='mt-5' blog={topResult.target} />
                  </CardContent>

                  <Actions />
                </Box>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Hot
