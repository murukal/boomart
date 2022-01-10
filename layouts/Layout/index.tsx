// react
import React, { useState } from 'react'
// mui
import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
// project
import SideBar from '../SideBar'
import HeadBar from '../HeadBar'

const Layout = () => {
  const theme = useTheme()
  const [isSideOpened, setIsSideOpened] = useState(true)

  const onDrawerToggle = () => {
    setIsSideOpened(!isSideOpened)
  }

  return (
    <Box className='bg-black h-screen'>
      <AppBar color='inherit' elevation={0} position='fixed'>
        <Toolbar
          sx={{
            height: theme.layouts.toolbarHeight
          }}
        >
          <HeadBar onDrawerToggle={onDrawerToggle} isOpened={isSideOpened} />
        </Toolbar>
      </AppBar>

      <SideBar isOpened={isSideOpened} onDrawerToggle={onDrawerToggle}></SideBar>
    </Box>
  )
}

export default Layout
