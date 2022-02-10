// next
import { useRouter } from 'next/router'
import Image from 'next/image'
// mui
import { Box, Button, Container, Divider, Tab, Tabs } from '@mui/material'
import { KeyboardArrowDown, Search, Facebook, Twitter, GitHub, Notes } from '@mui/icons-material'
// project
import logo from '../../public/logo.png'

const Header = () => {
  const router = useRouter()

  /** 搜索 */
  const onSearch = () => {
    router.push('/test')
  }

  return (
    <>
      {/* title */}
      <Container className='my-5 flex justify-between'>
        <Image src={logo} alt='logo' />

        <Box className='flex items-center'>
          <Button variant='text' endIcon={<KeyboardArrowDown />}>
            传送门
          </Button>
          <Divider className='mx-3 h-5' orientation='vertical' />
          <Button variant='text' startIcon={<Search />} onClick={onSearch}>
            搜索
          </Button>
        </Box>
      </Container>

      {/* 华丽的分割线 */}
      <Divider />

      {/* 菜单栏 */}
      <Container className='flex justify-between sticky'>
        <Box>
          {/* <Tabs aria-label='basic tabs example'>
            <Tab label='Item One' />
            <Tab label='Item Two' />
            <Tab label='Item Three' />
          </Tabs> */}
        </Box>
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
