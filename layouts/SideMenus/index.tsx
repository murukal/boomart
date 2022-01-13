// react
import { useEffect, useState } from 'react'
// next
import { useRouter } from 'next/router'
// mui
import { MenuList, MenuItem, Typography } from '@mui/material'
import { MenuTree } from '../../typings/menu'
import { getMenuTree } from '../../apis/menu'

const SideMenus = () => {
  const router = useRouter()
  const [menuTree, setMenuTree] = useState<MenuTree>()

  const onFetch = async () => {
    const res = await getMenuTree('BOOMART')
    setMenuTree(res.data || undefined)
  }

  const onClick = (url: string) => {
    return () => router.push(url)
  }

  // 渲染组件数据
  useEffect(() => {
    onFetch()
  }, [])

  return (
    <MenuList>
      {menuTree?.nodes?.map((menu) => {
        return (
          <MenuItem key={menu._id} onClick={onClick(menu.to)}>
            <Typography>{menu.description}</Typography>
          </MenuItem>
        )
      })}
    </MenuList>
  )
}

export default SideMenus
