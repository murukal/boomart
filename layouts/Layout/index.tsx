// react
import { useEffect, useState } from 'react'
// mui
import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
// project
import type { Props } from './assets'
import SideBar from '../SideBar'
import HeadBar from '../HeadBar'
// third
import PerfectScrollbar from 'perfect-scrollbar'

const Layout = (props: Props) => {
  const theme = useTheme()

  useEffect(() => {
    const ps = new PerfectScrollbar('#content')

    // 返回一个函数，react会在自动注销
    return () => {
      ps.destroy()
    }
  }, [props.children])

  const [isSideOpened, setIsSideOpened] = useState(false)

  const onDrawerToggle = () => {
    setIsSideOpened(!isSideOpened)
  }

  return (
    <Box className='h-screen'>
      <AppBar color='inherit' elevation={0} position='sticky'>
        <Toolbar
          sx={{
            height: theme.layouts.toolbarHeight
          }}
        >
          <HeadBar onDrawerToggle={onDrawerToggle} isOpened={isSideOpened} />
        </Toolbar>
      </AppBar>

      <Box
        className='flex'
        sx={{
          height: `calc(100% - ${theme.layouts.toolbarHeight})`
        }}
      >
        {/* 侧边导航栏 */}
        <SideBar
          isOpened={isSideOpened}
          onDrawerToggle={onDrawerToggle}
          transitionDuration={theme.transitions.duration.enteringScreen}
          SlideProps={{ easing: theme.transitions.easing.easeOut }}
        />

        {/* 页面正文 */}
        <Box
          className='flex flex-col'
          sx={{
            transition: theme.transitions.create('all', {
              duration: theme.transitions.duration.enteringScreen,
              easing: theme.transitions.easing.easeOut
            }),
            marginLeft: isSideOpened ? theme.layouts.drawerWidth : '0px',
            width: `calc(100% - ${isSideOpened ? theme.layouts.drawerWidth : '0px'})`
          }}
        >
          <div id='content' className='flex-1 h-0 p-2 relative overflow-hidden'>
            {props.children}
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
