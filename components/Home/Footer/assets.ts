// react
import type { CSSProperties } from "react";
// mui
import type { SxProps } from "@mui/material";

export interface Props {
    className?: string
}

export const footerTitleStyles: SxProps = {
    fontSize: '12px',
    textTransform: 'uppercase',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#eaecee',
    position: 'relative',
    paddingBottom: '12px',
    marginBottom: '16px',
    '&::after': {
        content: '""',
        backgroundColor: 'black',
        height: '3px',
        width: '50px',
        position: 'absolute',
        bottom: 0,
        left: 0
    }
}

export const footerContentStyles: CSSProperties = {
    color: '#687385',
    fontSize: '12px',
    fontWeight: 400
}