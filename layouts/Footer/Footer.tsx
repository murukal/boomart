// mui
import { Box, Container, Grid, Typography, Link, Divider, CardMedia } from '@mui/material'
// project
import footerStyles from './Footer.module.css'
import layoutStyles from '../Layout/Layout.module.css'
import beian from '~/public/beian.png'
import TagChips from './TagChips'
import type { Props } from '.'

const Footer = (props: Props) => {
  return (
    <Box component='footer' className={props.className}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Typography className={layoutStyles['plate-title']}>abount us</Typography>

            <Typography className={`mb-3 ${footerStyles.content}`}>谁也阻挡不了一颗想要创作的心</Typography>

            <Typography className='mb-2 font-bold' color='#212529'>
              邮箱地址
            </Typography>
            <Typography className={`${footerStyles.content} ${footerStyles['email-address']}`}>
              fanfan@fantufantu.com
            </Typography>
            <Typography className={`${footerStyles.content} ${footerStyles['email-address']}`}>
              tutu@fantufantu.com
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={layoutStyles['plate-title']}>quick link</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={layoutStyles['plate-title']}>tags</Typography>
            {/* chips */}
            <TagChips clickable variant='outlined' color='info' />
          </Grid>
          <Grid item xs={4}>
            <Typography className={layoutStyles['plate-title']}>newsletter</Typography>
          </Grid>
        </Grid>

        <Divider className='my-7' />

        {/* copyright */}
        <Box className='flex justify-between'>
          <Link target='_blank' rel='noreferrer' href='https://beian.miit.gov.cn' underline='none'>
            <Typography className={footerStyles.content}>浙ICP备2021003835号</Typography>
          </Link>

          <Link
            className='flex items-center'
            target='_blank'
            rel='noreferrer'
            href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902003160'
            underline='none'
          >
            <CardMedia
              className='mr-1'
              sx={{
                width: beian.width,
                height: beian.height
              }}
              image={beian.src}
            />

            <Typography className={footerStyles.content}>浙公网安备33010902003160号</Typography>
          </Link>

          <Typography className={footerStyles.content}>Copyright © 2022 by fanfan & tutu</Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
