// next
import { useRouter } from 'next/router'
// react
import { useRef, useState, useMemo } from 'react'
// mui
import { Button, Menu, MenuItem, Typography } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'
// project
import type { Props } from './assets'

const ShortCutPortal = (props: Props) => {
  const [isPortalOpened, setIsPortalOpened] = useState(false)

  const portalEl = useRef(null)
  const router = useRouter()

  const menus = useMemo(() => props.menus || [], [props.menus])
  const isParent = useMemo(() => menus.length !== 0, [menus])

  /** 打开侧边栏或者跳转页面 */
  const onPortalOpen = () => {
    if (isParent) {
      setIsPortalOpened(true)
    } else {
      props.onPrevPortalClick && props.onPrevPortalClick()
      router.push(props.portal.to || '/')
    }
  }

  /** 关闭侧边栏 */
  const onPortalClose = () => {
    setIsPortalOpened(false)
  }

  return (
    <>
      {!props.onPrevPortalClick ? (
        <Button ref={portalEl} variant='text' endIcon={isParent && <KeyboardArrowDown />} onClick={onPortalOpen}>
          {props.portal.name}
        </Button>
      ) : (
        <MenuItem ref={portalEl} onClick={onPortalOpen}>
          <Typography color='primary'>{props.portal.name}</Typography>
        </MenuItem>
      )}

      {isParent && (
        <Menu
          open={isPortalOpened}
          anchorEl={portalEl.current}
          anchorOrigin={{
            horizontal: props.anchorOrigin?.horizontal || 'right',
            vertical: props.anchorOrigin?.vertical || 'top'
          }}
          transformOrigin={{
            horizontal: 0,
            vertical: -12
          }}
          onClose={onPortalClose}
        >
          {menus.map((menu) => (
            <ShortCutPortal key={menu.id} portal={menu} menus={menu.children} onPrevPortalClick={onPortalClose} />
          ))}
        </Menu>
      )}
    </>
  )
}

export default ShortCutPortal
