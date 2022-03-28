// next
import Image from 'next/image'
// mui
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material'
// project
import { getTitleStyle, getContentStyle } from '.'
import beian from '../../public/beian.png'
import TagChips from './TagChips'
import type { Props } from '.'

const Footer = (props: Props) => {
  return (
    <Box component='footer' className={props.className}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Typography sx={getTitleStyle}>abount us</Typography>

            <Typography className='mb-3' sx={getContentStyle}>
              谁也阻挡不了一颗想要创作的心
            </Typography>

            <Typography className='mb-3 font-bold' color='#212529'>
              邮箱地址
            </Typography>
            <Typography sx={getContentStyle}>fanfan: rrongpan@outlook.com</Typography>
            <Typography sx={getContentStyle}>tutu: jokerxxx222@126.com</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={getTitleStyle}>quick link</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={getTitleStyle}>tags</Typography>
            {/* chips */}
            <TagChips />
          </Grid>
          <Grid item xs={4}>
            <Typography sx={getTitleStyle}>newsletter</Typography>
          </Grid>
        </Grid>

        <Divider className='my-7' />

        {/* copyright */}
        <Box className='flex justify-between'>
          <Link sx={getContentStyle} target='_blank' rel='noreferrer' href='https://beian.miit.gov.cn' underline='none'>
            浙ICP备2021003835号
          </Link>

          <Link
            className='flex items-center'
            sx={getContentStyle}
            target='_blank'
            rel='noreferrer'
            href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902003160'
            underline='none'
          >
            <Image src={beian} alt='' />
            浙公网安备 33010902003160号
          </Link>

          <Typography sx={getContentStyle}>Copyright © 2022 by fanfan & tutu</Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
