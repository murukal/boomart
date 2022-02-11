// react
import type { CSSProperties } from "react";
// project
import { getBlogs } from '../../apis/blog'

export const blogTitleStyles: CSSProperties = {
    fontSize: 20,
    fontWeight: 700
}

export const onFetchLatestBlogs = async () => {
    const res = await getBlogs({
        pagination: {
            limit: 4,
            page: 1,
            populate: ['tags', 'createdBy']
        }
    })

    return res.data?.docs || []
}
