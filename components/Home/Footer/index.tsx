// next
import Image from "next/image";
// mui
import { Box, Container, Grid, Typography, Link, Divider } from "@mui/material";
// project
import { footerTitleStyles, footerContentStyles } from "./assets";
import beian from '../../../public/beian.png'
import type { Props } from "./assets";

const Footer = (props: Props) => {
    return (
        <Box component='footer' className={props.className} >
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Typography variant='h5' sx={footerTitleStyles}>
                            abount us
                        </Typography>

                        <Typography className='mb-3' style={footerContentStyles}>
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
                        <Typography style={footerContentStyles}>fanfan: rrongpan@outlook.com</Typography>
                        <Typography style={footerContentStyles}>tutu: jokerxxx222@126.com</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='h5' sx={footerTitleStyles}>
                            quick link
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='h5' sx={footerTitleStyles}>
                            tags
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='h5' sx={footerTitleStyles}>
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
                        style={footerContentStyles}
                        underline='none'
                    >
                        浙ICP备2021003835号
                    </Link>

                    <Link
                        className='flex items-center'
                        target='_blank'
                        rel='noreferrer'
                        href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902003160'
                        style={footerContentStyles}
                        underline='none'
                    >
                        <Image src={beian} alt='' />
                        浙公网安备 33010902003160号
                    </Link>
                    <Typography style={footerContentStyles}>Copyright © 2022 by fanfan & tutu</Typography>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer