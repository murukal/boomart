// next
import { useRouter } from "next/router";
// react
import { useRef, useState, useMemo } from "react";
// mui
import { Button, Popover } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
// project
import type { Props } from "./assets";

const ShortCutPortal = (props: Props) => {


    const [isPortalOpened, setIsPortalOpened] = useState(false)

    const portalEl = useRef(null)
    const router = useRouter()

    const children = useMemo(() => props.children || [], [props.children])
    const isParent = useMemo(() => children.length !== 0, [children])

    const onPortalOpen = () => {
        if (isParent) {
            setIsPortalOpened(true)
        } else {
            props.portal.to && router.push(props.portal.to)
        }
    }
    const onPortalClose = () => {
        setIsPortalOpened(false)
    }

    return <>

        <Button ref={portalEl} variant='text' endIcon={isParent && <KeyboardArrowDown />}
            onClick={onPortalOpen}>
            {props.portal.description}
        </Button>


        {isParent &&
            <Popover
                open={isPortalOpened}
                anchorEl={portalEl.current}
                anchorOrigin={
                    {
                        horizontal: props.anchorOrigin?.horizontal || "right",
                        vertical: props.anchorOrigin?.vertical || "top"
                    }
                }
                onClose={onPortalClose}
            >

                {children.map((menu) =>
                    <ShortCutPortal portal={menu} children={menu.children} />
                )}

            </Popover>}
    </>
}

export default ShortCutPortal