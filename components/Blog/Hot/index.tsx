// react
import { useMemo } from 'react'
// mui
import { Container, Grid, Typography, Paper, Card, CardMedia, CardContent, Box } from '@mui/material'
import { LabelOutlined } from '@mui/icons-material'
// third
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import _ from 'lodash'
// project
import Tags from '../Tags'
import Signature from '../Signature'
import { blogTitleStyle } from '../assets'
import { hotTagStyle } from './assets'
import type { Props } from './assets'
import type { Tag } from '../../../typings/tag'

const Hot = (props: Props) => {
  // 抽离tags
  const hotTags = useMemo<Tag[]>(() => {
    const tags = [...props.browseTopResults, ...props.likeTopResults].reduce((previous, topResult) => {
      return previous.concat(topResult.target.tags as Tag[])
    }, [] as Tag[])

    return _.uniqBy(tags, '_id')
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
            <Typography key={tag._id} component='span' sx={hotTagStyle}>
              {tag.name}
            </Typography>
          ))}
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
        {props.browseTopResults.map((topResult) => {
          // 断言获取标签
          const tags = topResult.target.tags as Tag[]

          return (
            <Grid key={topResult.target._id} item xs={4}>
              <Card className='h-96' onClick={props.onCardClick}>
                <CardMedia
                  component='img'
                  height='200'
                  image={topResult.target.cover || tags[0]?.cover}
                  alt='Paella dish'
                />
                <CardContent className='p-7'>
                  <Tags className='mb-3' tags={tags} />
                  <Typography style={blogTitleStyle}>{topResult.target.title}</Typography>

                  {/* 博客署名 */}
                  <Signature className='mt-5' blog={topResult.target} />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Hot
