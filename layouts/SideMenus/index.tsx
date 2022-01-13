// react
import { useEffect, useState } from 'react'
// mui
import { MenuList, MenuItem, Typography } from '@mui/material'
import { MenuTree } from '../../typings/menu'
import { getMenuTree } from '../../apis/menu'

const SideMenus = () => {
  const [menuTree, setMenuTree] = useState<MenuTree>()

  const onFetch = async () => {
    const res = await getMenuTree('BOOMART')
    setMenuTree(res.data || undefined)
  }

  // 渲染组件数据
  useEffect(() => {
    onFetch()
  }, [])

  return (
    <MenuList>
      {menuTree?.nodes?.map((menu) => {
        return (
          <MenuItem key={menu._id}>
            <Typography>{menu.description}</Typography>
          </MenuItem>
        )
      })}
    </MenuList>
  )
}

export default SideMenus
