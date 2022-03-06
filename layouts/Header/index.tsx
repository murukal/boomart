// react
import { useEffect, useMemo, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
// next
import { useRouter } from 'next/router'
import Image from 'next/image'
// redux
import { useDispatch, useSelector } from 'react-redux'
// mui
import {
  Box,
  Button,
  Container,
  Divider,
  Tabs,
  Tab,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  IconButton
} from '@mui/material'
import { Search, Facebook, Twitter, GitHub, Notes, Home } from '@mui/icons-material'
// project
import logo from '../../public/logo.png'
import ShortcutPortal from '../../components/Navigator/ShortcutPortal'
import { getMenuTrees } from '../../apis/menu'
import { logout } from '../../redux/userProfile/actions'
import { onLogin } from '../../utils/account'
import type { MenuTree } from '../../typings/menu'

import { signIn } from 'next-auth/react'

const Header = () => {
  const [menuTree, setMenuTree] = useState<MenuTree | null>()
  const [isUserProfileOpened, setIsUserProfileOpened] = useState(false)

  const userProfileEl = useRef(null)
  const router = useRouter()
  const tags = useSelector((state) => state.tags)
  const userProfile = useSelector((state) => state.userProfile)
  const dispatch = useDispatch()

  /** 搜索 */
  const onSearch = () => {
    router.push('/search')
  }

  const onFetch = async () => {
    setMenuTree((await getMenuTrees(['BOOMART'])).data?.at(0))
  }

  /** 初次渲染请求 */
  useEffect(() => {
    onFetch()
  }, [])

  /** 用户菜单关闭 */
  const onUserProfileClose = () => {
    setIsUserProfileOpened(false)
  }

  /** 用户菜单打开 */
  const onUserProfileOpen = () => {
    setIsUserProfileOpened(true)
  }

  /** 退出登陆 */
  const onLogout = () => {
    dispatch(logout())
  }

  /** tab 切换 */
  const onTabChange = (event: SyntheticEvent, value: string) => {
    router.push(value)
  }

  /** tabs */
  const tabs = useMemo(
    () => tags.map((tag) => <Tab key={tag._id} label={tag.name} value={`/category/${tag._id}`} />),
    [tags]
  )

  /** 选中 tab */
  const tabValue = useMemo(
    () => (tags.length ? (['/category/[id]', '/'].includes(router.pathname) ? router.asPath : false) : '/'),
    [tags, router.asPath]
  )

  return (
    <>
      {/* title */}
      <Container className='my-5 flex justify-between'>
        <Image src={logo} alt='logo' />

        <Box className='flex items-center'>
          <ShortcutPortal
            menuTreeNodes={menuTree?.nodes}
            portal={{
              description: '传送门'
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
          {/* 已登陆显示用户头像 */}
          {userProfile.isLogin ? (
            <>
              <Avatar
                ref={userProfileEl}
                className='ml-2 w-8 h-8'
                src={userProfile.user?.avatar}
                onClick={onUserProfileOpen}
              />
              <Menu anchorEl={userProfileEl.current} open={isUserProfileOpened} onClose={onUserProfileClose}>
                <MenuItem onClick={onLogout}>
                  <Typography color='primary'>注销</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button variant='contained' onClick={() => signIn()}>
              Sign in
            </Button>
          )}
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
            <Facebook />
          </IconButton>
          <IconButton>
            <Twitter />
          </IconButton>
          <IconButton>
            <GitHub />
          </IconButton>
          <IconButton>
            <Notes />
          </IconButton>
        </Box>
      </Container>
    </>
  )
}

export default Header
