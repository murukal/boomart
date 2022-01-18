// react
import React, { useEffect, useState } from 'react'
// mui
import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
// project
import SideBar from '../SideBar'
import HeadBar from '../HeadBar'
import { getUser } from '../../apis/account'
import { Props } from './assets'

const Layout = (props: Props) => {
  const theme = useTheme()

  const [isSideOpened, setIsSideOpened] = useState(true)

  const onDrawerToggle = () => {
    setIsSideOpened(!isSideOpened)
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await getUser()
      console.log('res=====', res)
    }

    fetch()
  }, [])

  return (
    <Box className='h-screen'>
      <AppBar color='inherit' elevation={0} position='fixed'>
        <Toolbar
          sx={{
            height: theme.layouts.toolbarHeight
          }}
        >
          <HeadBar onDrawerToggle={onDrawerToggle} isOpened={isSideOpened} />
        </Toolbar>
      </AppBar>

      <Box
        className='flex h-full'
        sx={{
          paddingTop: theme.layouts.toolbarHeight
        }}
      >
        {/* 侧边导航栏 */}
        <SideBar isOpened={isSideOpened} onDrawerToggle={onDrawerToggle} transitionDuration={theme.transitions.duration.enteringScreen} SlideProps={{ easing: theme.transitions.easing.easeOut }} />

        {/* 页面正文 */}
        <Box
          className='h-full w-full bg-slate-400 p-2 rounded-t-md'
          sx={{
            transition: theme.transitions.create('margin', {
              duration: theme.transitions.duration.enteringScreen,
              easing: theme.transitions.easing.easeOut
            }),
            marginLeft: `calc(10px + ${isSideOpened ? theme.layouts.drawerWidth : '0px'})`,
            marginRight: '10px'
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
