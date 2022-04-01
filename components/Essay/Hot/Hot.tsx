// react
import { useMemo } from 'react'
// mui
import { Container, Grid, Typography, CardMedia, Box } from '@mui/material'
import { LabelOutlined } from '@mui/icons-material'
// third
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
// project
import Wrapper from '../Wrapper'
import styles from './Hot.module.css'
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
            <Typography className={styles.tag} key={tagName} component='span' color={(theme) => theme.palette.muted?.main}>
              {tagName}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={8}>
          <Swiper className='h-full' modules={[Autoplay]} autoplay={true} loop={true} navigation={true}>
            {likeTopEssays.map((essay) => (
              <SwiperSlide className='flex justify-center items-center' key={essay.id}>
                <CardMedia className='h-full w-full' image={essay.cover || (essay.tags as Tag[]).at(0)?.image} />

                {/* 蒙层 */}
                <Box
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute',
                    width: '100%',
                    height: '100px',
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant='h3' className='m-4' color='white'>
                    {essay.title}
                  </Typography>
                </Box>
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
