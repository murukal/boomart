// react
import { useMemo } from 'react'
// mui
import { Container, Grid, Typography, Paper, Card, CardMedia, CardContent, Box } from '@mui/material'
import { LabelOutlined } from '@mui/icons-material'
// third
import { Autoplay, EffectFade, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
// project
import Wrapper from '../Wrapper'
import { getHotTagStyle } from './assets'
import { getEssayTop } from '../../../apis/toggle'
import type { Props } from './assets'
import type { Tag } from '../../../typings/tag'

const Hot = (props: Props) => {
  /** 请求浏览量最高的4篇文章 */
  const { data: browseTopRes } = useSWR('/api/toggle/top/browse/4', () =>
    getEssayTop({
      limit: 4,
      type: 'BROWSE'
    })
  )

  const browseTopResults = useMemo(() => browseTopRes?.data || [], [browseTopRes])

  /** 请求点赞量最高的4篇文章 */
  const { data: thumbUpTopRes } = useSWR('/api/toggle/top/thumb-up/3', () =>
    getEssayTop({
      limit: 3,
      type: 'THUMBUP'
    })
  )

  const thumbUpTopResults = useMemo(() => thumbUpTopRes?.data || [], [thumbUpTopRes])

  // 抽离tags
  // const hotTags = useMemo<Tag[]>(() => {
  //   const tags = [...browseTopResults, ...thumbUpTopResults].reduce((previous, topResult) => {
  //     return previous.concat(topResult.target.tags as Tag[])
  //   }, [] as Tag[])

  //   return uniqBy(tags, '_id')
  // }, [browseTopResults, thumbUpTopResults])

  return (
    <Container className={props.className}>
      {/* 热门文章cards */}
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Typography>当前热门🔥</Typography>
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
            onSlideChange={() => console.log('slide change')}
            autoplay={true}
            effect='fade'
            navigation={true}
          >
            {thumbUpTopResults.map((topResult) => (
              <SwiperSlide className='flex justify-center items-center' key={topResult._id}>
                <CardMedia
                  component='img'
                  image={topResult.target.cover || (topResult.target.tags as Tag[]).at(0)?.cover}
                  alt={topResult.target.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        {/* 排名后4 */}
        {browseTopResults.map((topResult) => (
          <Grid key={topResult.target._id} item xs={4}>
            <Wrapper essay={topResult.target} type='vertical' />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Hot
