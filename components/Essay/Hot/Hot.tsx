// react
import { useMemo } from 'react'
// mui
import { Container, Grid, Typography, CardMedia } from '@mui/material'
import { LabelOutlined } from '@mui/icons-material'
// third
import { Autoplay, EffectFade, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
// project
import Wrapper from '../Wrapper'
import { getHotTagStyle } from '.'
import type { Props } from '.'
import type { Tag } from '../../../typings/tag'

const Hot = (props: Props) => {
  const browseTopEssays = useMemo(() => props.browseTopEssays || [], [props.browseTopEssays])
  const likeTopEssays = useMemo(() => props.likeTopEssays || [], [props.likeTopEssays])

  // 抽离tags
  const hotTagNames = useMemo(() => {
    const tagNames = [...browseTopEssays, ...likeTopEssays].reduce<string[]>((previous, essay) => {
      return previous.concat(essay.tags.map((tag) => tag.name))
    }, [])

    return [...new Set(tagNames)]
  }, [browseTopEssays, likeTopEssays])

  const onSlideChange = () => {
    console.log('slide change')
  }

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

          {hotTagNames.map((tagName) => (
            <Typography sx={getHotTagStyle} key={tagName} component='span' color={(theme) => theme.palette.muted?.main}>
              {tagName}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={8}>
          <Swiper
            className='h-full'
            modules={[Autoplay, EffectFade, Navigation]}
            onSlideChange={onSlideChange}
            autoplay={true}
            effect='fade'
            navigation={true}
          >
            {likeTopEssays.map((essay) => (
              <SwiperSlide className='flex justify-center items-center' key={essay.id}>
                <CardMedia component='img' image={essay.cover || (essay.tags as Tag[]).at(0)?.image} alt={essay.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        {/* 浏览量榜单4 */}
        {browseTopEssays.map((essay) => (
          <Grid key={essay.id} item xs={4}>
            <Wrapper essay={essay} type='vertical' />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Hot
