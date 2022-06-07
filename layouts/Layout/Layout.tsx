// react
import { useEffect, useState } from 'react'
// mui
import { Box, Fab } from '@mui/material'
import { ArrowUpward } from '@mui/icons-material'
// third
import PerfectScrollbar from 'perfect-scrollbar'
// project
import Header from '../Header'
import Footer from '../Footer/Footer'
import type { Props } from '.'

const Layout = (props: Props) => {
  const [ps, setPs] = useState<PerfectScrollbar>()
  const [scrollTop, setScrollTop] = useState(0)

  /** 渲染 */
  useEffect(() => {
    // 初始化渲染滚动条
    const current = new PerfectScrollbar('#layout')

    // 设置滚动条的监听事件
    current.element.addEventListener('ps-scroll-y', (e) => {
      setScrollTop((e.target as any).scrollTop)
    })

    setPs(current)

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
      {/* 头部 */}
      <Header />

      {/* 内容 */}
      <Box>{props.children}</Box>

      {/* 底部 */}
      <Footer className='pt-12 pb-5' />

      <Fab
        sx={{
          position: 'fixed',
          bottom: 50,
          right: 50,
          display: scrollTop > 300 ? 'inline-flex' : 'none'
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
