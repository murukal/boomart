// mui
import type { PopoverOrigin } from "@mui/material";
// project
import type { MenuTreeNode } from "../../../typings/menu";

export interface Props {
    portal: Partial<MenuTreeNode>,
    children?: MenuTreeNode[] | null,
    anchorOrigin?: PopoverOrigin
}