// npm
import {stringify} from 'qs'
// next
import { useRouter } from 'next/router'
// material-ui
import { useTheme } from '@mui/material/styles'
import { Box, ButtonBase, IconButton } from '@mui/material'
import { MenuOpen, Menu, Person } from '@mui/icons-material'
// project
import Search from '../../components/Search'
import { Props } from './assets'

const Header = (props: Props) => {
  const theme = useTheme()
  const router = useRouter()

  // 跳转到登录页
  const onGotoLogin = () => {
    // 转到boom的统一认证登录，当前客户端不做单独的认证登录
    router.push(`http://admin.r2boom.com/account/login?redirect=${window.location.href}`)
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

        <ButtonBase className='rounded-md' onClick={props.onDrawerToggle}>
          {props.isOpened ? <MenuOpen fontSize='large' /> : <Menu fontSize='large' />}
        </ButtonBase>
      </Box>

      {/* header search */}
      <Box className='flex flex-grow justify-center'>
        <Search />
      </Box>

      {/* avatar */}
      <Box className='flex flex-grow justify-end mr-4'>
        <IconButton onClick={onGotoLogin}>
          <Person />
        </IconButton>
      </Box>
    </>
  )
}

export default Header
