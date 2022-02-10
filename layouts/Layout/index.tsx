// mui
import { Box } from '@mui/material'
// project
import Header from '../Header'
// third
import PerfectScrollbar from 'perfect-scrollbar'
// project
import type { Props } from './assets'
import { useEffect } from 'react'

const Layout = (props: Props) => {
  useEffect(() => {
    const ps = new PerfectScrollbar('#layout')

    return () => {
      ps.destroy()
    }
  }, [props.children])

  return (
    <Box id='layout' className='h-screen relative overflow-hidden'>
      <Header />
      <Box>{props.children}</Box>
    </Box>
  )
}

export default Layout
