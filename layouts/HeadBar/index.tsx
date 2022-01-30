// npm
import { stringify } from 'qs'
// next
import { useRouter } from 'next/router'
// material-ui
import { useTheme } from '@mui/material/styles'
import { Box, IconButton, Avatar } from '@mui/material'
import { MenuOpen, Menu, Person } from '@mui/icons-material'
// project
import Search from '../../components/Search'
import { Props } from './assets'
import { useSelector } from 'react-redux'

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

        <IconButton onClick={props.onDrawerToggle}>{props.isOpened ? <MenuOpen fontSize='large' /> : <Menu fontSize='large' />}</IconButton>
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

      {/* avatar */}
      <Box className='flex mr-4 flex-1 justify-end items-center'>
        {userProfile.isLogin ? (
          <Avatar alt={userProfile.user?.username} src={userProfile.user?.avatar} />
        ) : (
          <IconButton onClick={onGotoLogin}>
            <Person />
          </IconButton>
        )}
      </Box>
    </>
  )
}

export default Header
