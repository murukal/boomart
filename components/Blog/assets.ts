// react
import type { CSSProperties } from 'react'
// project
import { getBlogs } from '../../apis/blog'
import type { Blog } from '../../typings/blog'

export interface LatestResult {
  blogs: Blog[]
  totalPages: number
}

export const onFetchLatest = async (page: number = 1) => {
  const res = await getBlogs({
    pagination: {
      limit: 4,
      page,
      populate: ['tags', 'createdBy']
    }
  })

  return {
    blogs: res.data?.docs || [],
    totalPages: res.data?.totalPages || 0
  }
}
