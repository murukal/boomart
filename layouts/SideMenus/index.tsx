// react
import { useEffect, useState } from 'react'
// next
import { useRouter } from 'next/router'
// mui
import { MenuList, MenuItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { AbcSharp } from '@mui/icons-material'
// project
import { MenuTree } from '../../typings/menu'
import { getMenuTree } from '../../apis/menu'

const SideMenus = () => {
  const router = useRouter()
  const [menuTree, setMenuTree] = useState<MenuTree>()

  const onFetch = async () => {
    const res = await getMenuTree('BOOMART')
    setMenuTree(res.data || undefined)
  }

  const onClick = (to: string) => {
    return () => router.push(to)
  }

  const isSelected = (to: string) => router.pathname === to

  // 渲染组件数据
  useEffect(() => {
    onFetch()
  }, [])

  return (
    <MenuList>
      {menuTree?.nodes?.map((menu) => {
        return (
          <MenuItem key={menu._id}>
            <ListItemButton onClick={onClick(menu.to)} selected={isSelected(menu.to)}>
              <ListItemIcon>
                <AbcSharp />
              </ListItemIcon>

              <ListItemText primary={menu.description} />
            </ListItemButton>
          </MenuItem>
        )
      })}
    </MenuList>
  )
}

export default SideMenus
