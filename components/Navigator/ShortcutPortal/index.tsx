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

  const menuTreeNodes = useMemo(() => props.menuTreeNodes || [], [props.menuTreeNodes])
  const isParent = useMemo(() => menuTreeNodes.length !== 0, [menuTreeNodes])

  const onPortalOpen = () => {
    if (isParent) {
      setIsPortalOpened(true)
    } else {
      props.onPrevPortalClick && props.onPrevPortalClick()
      router.push(props.portal.to || '/')
    }
  }
  const onPortalClose = () => {
    setIsPortalOpened(false)
  }

  return (
    <>
      {!props.onPrevPortalClick ? (
        <Button ref={portalEl} variant='text' endIcon={isParent && <KeyboardArrowDown />} onClick={onPortalOpen}>
          {props.portal.description}
        </Button>
      ) : (
        <MenuItem ref={portalEl} onClick={onPortalOpen}>
          <Typography color='primary'>{props.portal.description}</Typography>
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
          onClose={onPortalClose}
        >
          {menuTreeNodes.map((menu) => (
            <ShortCutPortal
              key={menu._id}
              portal={menu}
              menuTreeNodes={menu.children}
              onPrevPortalClick={onPortalClose}
            />
          ))}
        </Menu>
      )}
    </>
  )
}

export default ShortCutPortal
