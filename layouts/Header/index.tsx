// react
import { useEffect, useRef, useState } from 'react'
// next
import { useRouter } from 'next/router'
import Image from 'next/image'
// redux
import { useDispatch, useSelector } from 'react-redux'
// mui
import { Box, Button, Container, Divider, Tabs, Tab, Avatar, Menu, MenuItem, Typography } from '@mui/material'
import { Search, Facebook, Twitter, GitHub, Notes } from '@mui/icons-material'
// third
import { stringify } from 'qs'
// project
import logo from '../../public/logo.png'
import ShortcutPortal from '../../components/Navigator/ShortcutPortal'
import { getMenuTree } from '../../apis/menu'
import type { MenuTree } from '../../typings/menu'
import { logout } from '../../redux/userProfile/actions'

const Header = () => {
  const [menuTree, setMenuTree] = useState<MenuTree | null>()
  const [tabIndex, setTabIndex] = useState(0)
  const [isUserProfileOpened, setIsUserProfileOpened] = useState(false)

  const userProfileEl = useRef(null)
  const router = useRouter()
  const tags = useSelector((state) => state.tags)
  const userProfile = useSelector((state) => state.userProfile)
  const dispatch = useDispatch()

  /** 搜索 */
  const onSearch = () => {
    router.push('/mui')
  }

  const onFetch = async () => {
    const res = await getMenuTree('BOOMART')
    setMenuTree(res.data)
  }

  /** 初次渲染请求 */
  useEffect(() => {
    onFetch()
  }, [])

  /** 登陆 */
  const onSignIn = () => {
    const params = {
      redirect: window.location.href
    }

    window.location.href = `http://admin.r2boom.com/account/login?${stringify(params)}`
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
  const onLogout = () => {
    dispatch(logout())
  }

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
            <Button variant='contained' onClick={onSignIn}>
              Sign in
            </Button>
          )}
        </Box>
      </Container>

      {/* 华丽的分割线 */}
      <Divider />

      {/* 菜单栏 */}
      <Container className='flex justify-between items-center sticky'>
        <Tabs
          value={tabIndex}
          variant='scrollable'
          scrollButtons='auto'
          sx={{
            flex: 1,
            marginRight: '20px'
          }}
        >
          {tags.map((tag) => (
            <Tab key={tag._id} label={tag.name} />
          ))}
        </Tabs>

        <Box className='my-4'>
          <Facebook />
          <Twitter />
          <GitHub />
          <Notes />
        </Box>
      </Container>
    </>
  )
}

export default Header
