// react
import { useEffect, useState } from 'react'
// next
import { useRouter } from 'next/router'
import Image from 'next/image'
// mui
import { Box, Button, Container, Divider, Tabs, Tab } from '@mui/material'
import { Search, Facebook, Twitter, GitHub, Notes } from '@mui/icons-material'
// project
import logo from '../../public/logo.png'
import ShortcutPortal from '../../components/Navigator/ShortcutPortal'
import { getMenuTree } from '../../apis/menu'
import type { MenuTree } from '../../typings/menu'
import { useSelector } from 'react-redux'

const Header = () => {
  const [menuTree, setMenuTree] = useState<MenuTree | null>()
  const [tabIndex, setTabIndex] = useState(0)

  const router = useRouter()
  const tags = useSelector((state) => state.tags)

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
