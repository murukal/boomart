// react
import { useEffect, useMemo, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
// next
import { useRouter } from 'next/router'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
// redux
import { useSelector } from 'react-redux'
// mui
import { Box, Button, Container, Divider, Tabs, Tab, Avatar, Menu, MenuItem, Typography, IconButton } from '@mui/material'
import { Search, Notes, Home, RotateRightRounded } from '@mui/icons-material'
// project
import logo from '../../public/logo.png'
import ShortcutPortal from '../../components/Navigator/ShortcutPortal'
import { getMenus } from '../../apis/menu'
import type { Menu as MenuType } from '../../typings/menu'
import type { State } from '../../redux'
import type { Tag } from '../../typings/tag'

const Header = () => {
  const [menus, setMenus] = useState<MenuType[]>([])
  const [isUserProfileOpened, setIsUserProfileOpened] = useState(false)

  const { data: session, status } = useSession()
  const userProfileEl = useRef(null)
  const router = useRouter()
  const tags = useSelector<State, Tag[]>((state) => state.tags)

  /** 搜索 */
  const onSearch = () => {
    router.push('/search')
  }

  /** 用户菜单关闭 */
  const onUserProfileClose = () => {
    setIsUserProfileOpened(false)
  }

  /** 用户菜单打开 */
  const onUserProfileOpen = () => {
    setIsUserProfileOpened(true)
  }

  /** 退出登陆 */
  const onLogout = () => {}

  /** tab 切换 */
  const onTabChange = (event: SyntheticEvent, value: string) => {
    router.push(value)
  }

  /** tabs */
  const tabs = useMemo(() => tags.map((tag) => <Tab key={tag.id} label={tag.name} value={`/category/${tag.id}`} />), [tags])

  /** 选中 tab */
  const tabValue = useMemo(
    () => (tags.length ? (['/category/[id]', '/'].includes(router.pathname) ? router.asPath : false) : '/'),
    [tags, router.asPath]
  )

  /** 进入登录页面 */
  const onGo2Login = () => {
    signIn(undefined, { callbackUrl: router.asPath })
  }

  /**
   * 加载中: loading
   * 登录：用户头像
   * 未登录：登录按钮
   */
  const authentication = useMemo(() => {
    if (status === 'loading') return <RotateRightRounded className='animate-spin' />

    if (!session)
      return (
        <Button variant='contained' onClick={onGo2Login}>
          Sign in
        </Button>
      )

    return (
      <>
        <Avatar ref={userProfileEl} className='ml-2 w-8 h-8 cursor-pointer' src={session.user?.image || undefined} onClick={onUserProfileOpen} />
        <Menu
          anchorEl={userProfileEl.current}
          open={isUserProfileOpened}
          onClose={onUserProfileClose}
          transformOrigin={{
            horizontal: 0,
            vertical: -12
          }}
        >
          <MenuItem onClick={onLogout}>
            <Typography color='primary'>注销</Typography>
          </MenuItem>
        </Menu>
      </>
    )
  }, [session, status, isUserProfileOpened])

  /**  */
  useEffect(() => {
    getMenus().then(({ data }) => setMenus(data?.menus.items || []))
  }, [])

  return (
    <>
      {/* title */}
      <Container className='my-5 flex justify-between'>
        <Image src={logo} alt='logo' />

        <Box className='flex items-center'>
          <ShortcutPortal
            menus={menus}
            portal={{
              name: '传送门'
            }}
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'bottom'
            }}
          />

          <Divider className='mx-3 h-5' orientation='vertical' />
          <Button variant='text' startIcon={<Search />} onClick={onSearch}>
            搜索
          </Button>

          <Divider className='mx-3 h-5' orientation='vertical' />

          {/* 认证信息 */}
          {authentication}
        </Box>
      </Container>

      {/* 华丽的分割线 */}
      <Divider />

      {/* 菜单栏 */}
      <Container className='flex justify-between items-center'>
        <Tabs
          value={tabValue}
          variant='scrollable'
          scrollButtons='auto'
          sx={{
            flex: 1,
            marginRight: '20px'
          }}
          onChange={onTabChange}
        >
          {/* home */}
          <Tab label='Home' icon={<Home />} value='/' iconPosition='start' />
          {tabs}
        </Tabs>

        <Box>
          <IconButton>
            <Notes />
          </IconButton>
        </Box>
      </Container>
    </>
  )
}

export default Header
