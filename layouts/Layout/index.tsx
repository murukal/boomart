// react
import { useEffect } from 'react'
// redux
import { useDispatch } from 'react-redux'
// mui
import { Box } from '@mui/material'
// third
import PerfectScrollbar from 'perfect-scrollbar'
// project
import Header from '../Header'
import Footer from '../Footer'
import { fetch } from '../../redux/tags/actions'
import type { Props } from './assets'

const Layout = (props: Props) => {
  const dispatch = useDispatch()

  // 获取tags存入redux
  useEffect(() => {
    fetch().then((res) => {
      dispatch(res)
    })
  }, [])

  // 生成滚动条
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
      {/* 底部 */}
      <Footer className='pt-12 pb-5' />
    </Box>
  )
}

export default Layout
