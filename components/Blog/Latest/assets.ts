// project
import type { Blog } from "../../../typings/blog";

export interface Props {
    className?: string
    blogs: Blog[],
    totalPages: number
}