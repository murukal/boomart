// react
import { createRef, useEffect, useState } from 'react'
// redux
import { useDispatch } from 'react-redux'
// mui
import { Box, Fab } from '@mui/material'
import { ArrowUpward } from '@mui/icons-material'
// third
import PerfectScrollbar from 'perfect-scrollbar'
// project
import Header from '../Header'
import Footer from '../Footer'
import { fetch } from '../../redux/tags/actions'
import type { Props } from './assets'

const Layout = (props: Props) => {
  const [ps, setPs] = useState<PerfectScrollbar>()

  const dispatch = useDispatch()

  /** 渲染 */
  useEffect(() => {
    // 获取tags存入redux
    fetch().then((res) => {
      dispatch(res)
    })

    // 初始化渲染滚动条
    setPs(new PerfectScrollbar('#layout'))

    return () => {
      ps?.destroy()
    }
  }, [])

  // 生成滚动条
  useEffect(() => {
    if (!ps) return

    // 更新滚动条
    ps.update()

    onGo2Top()
  }, [props.children])

  /** 回到顶部 */
  const onGo2Top = () => {
    ps?.element.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Box id='layout' className='h-screen relative overflow-hidden'>
      <Header />
      <Box>{props.children}</Box>
      {/* 底部 */}
      <Footer className='pt-12 pb-5' />

      <Fab
        sx={{
          position: 'fixed',
          bottom: 50,
          right: 50
        }}
        size='small'
        color='primary'
        onClick={onGo2Top}
      >
        <ArrowUpward />
      </Fab>
    </Box>
  )
}

export default Layout
