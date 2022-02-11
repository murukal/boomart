// react
import type { MouseEventHandler } from "react";
// project
import type { TopResults } from "../../../typings/trigger-event";

export interface Props {
    className?: string
    browseTopResults: TopResults,
    likeTopResults?: TopResults,
    onCardClick?: MouseEventHandler
}