// next
import { useRouter } from 'next/router'
// material-ui
import { useTheme } from '@mui/material/styles'
import { Box, IconButton, Avatar } from '@mui/material'
import { MenuOpen, Menu, Person, Star, History } from '@mui/icons-material'
// third
import { stringify } from 'qs'
// project
import Search from '../../components/Search'
import { useSelector } from 'react-redux'
import type { Props } from './assets'

const Header = (props: Props) => {
  const theme = useTheme()
  const router = useRouter()

  const userProfile = useSelector((state) => state.userProfile)

  // 跳转到登录页
  const onGotoLogin = () => {
    const params = {
      redirect: window.location.href
    }

    // 转到boom的统一认证登录，当前客户端不做单独的认证登录
    router.push(`http://admin.r2boom.com/account/login?${stringify(params)}`)
  }

  return (
    <>
      <Box
        className='flex'
        sx={{
          width: theme.layouts.drawerWidth
        }}
      >
        <Box component='span' className='flex-grow'></Box>

        <IconButton onClick={props.onDrawerToggle}>
          {props.isOpened ? <MenuOpen fontSize='large' /> : <Menu fontSize='large' />}
        </IconButton>
      </Box>

      {/* header search */}
      <Box
        className='flex justify-center items-center'
        sx={{
          flex: 4
        }}
      >
        <Search />
      </Box>

      <Box className='flex mr-4 flex-1 justify-end items-center'>
        {/* avatar */}
        {userProfile.isLogin ? (
          <Avatar alt={userProfile.user?.username} src={userProfile.user?.avatar} />
        ) : (
          <IconButton onClick={onGotoLogin} aria-label='登录/注册'>
            <Person />
          </IconButton>
        )}

        {/* star */}
        <IconButton aria-label='收藏夹' className='ml-2'>
          <Star />
        </IconButton>

        {/* history */}
        <IconButton aria-label='历史记录' className='ml-2'>
          <History />
        </IconButton>
      </Box>
    </>
  )
}

export default Header
