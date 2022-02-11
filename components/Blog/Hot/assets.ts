// react
import type { MouseEventHandler } from "react";
// mui
import type { SxProps } from "@mui/material";
// project
import type { TopResults } from "../../../typings/trigger-event";

export interface Props {
    className?: string
    browseTopResults: TopResults,
    likeTopResults: TopResults,
    onCardClick?: MouseEventHandler
}


export const hotTagStyle: SxProps = {
    position: "relative",
    fontSize: "12px",
    '&::before': {
        content: '"#"',
        fontSize: "12px",
    }
}