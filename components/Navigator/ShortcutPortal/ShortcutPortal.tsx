// next
import { useRouter } from 'next/router'
// react
import { useRef, useState, useMemo } from 'react'
// mui
import { ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { ChevronRight, KeyboardArrowDown } from '@mui/icons-material'
// project
import type { Props } from '.'

const ShortCutPortal = (props: Props) => {
  const [isPortalOpened, setIsPortalOpened] = useState(false)

  const portalEl = useRef(null)
  const router = useRouter()

  const menus = useMemo(() => props.menus || [], [props.menus])
  const isParent = useMemo(() => !!menus.length, [menus])

  /** 打开侧边栏或者跳转页面 */
  const onPortalOpen = () => {
    if (isParent) {
      setIsPortalOpened(true)
    } else {
      props.onPrevPortalClick && props.onPrevPortalClick()
      router.push(props.portal.to || '/')
    }
  }

  /** 关闭当前菜单 */
  const onPortalClose = () => {
    setIsPortalOpened(false)
  }

  /** 在跳转路由前的预回调：递归关闭菜单 */
  const onPrevPortalClick = () => {
    props.onPrevPortalClick && props.onPrevPortalClick()
    onPortalClose()
  }

  return (
    <>
      {!props.onPrevPortalClick ? (
        <LoadingButton
          ref={portalEl}
          loading={props.isLoading}
          variant='text'
          endIcon={isParent && <KeyboardArrowDown />}
          onClick={onPortalOpen}
        >
          {props.portal.name}
        </LoadingButton>
      ) : (
        <MenuItem ref={portalEl} onClick={onPortalOpen}>
          <ListItemText>{props.portal.name}</ListItemText>

          {isParent && (
            <ListItemIcon
              style={{
                minWidth: 'unset'
              }}
            >
              <ChevronRight fontSize='small' />
            </ListItemIcon>
          )}
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
            horizontal: props.transformOrigin?.horizontal ?? -4,
            vertical: props.transformOrigin?.vertical ?? 9
          }}
          onClose={onPortalClose}
          PaperProps={{
            sx: {
              minWidth: '140px'
            }
          }}
        >
          {menus.map((menu) => (
            <ShortCutPortal key={menu.id} portal={menu} menus={menu.children} onPrevPortalClick={onPrevPortalClick} />
          ))}
        </Menu>
      )}
    </>
  )
}

export default ShortCutPortal
