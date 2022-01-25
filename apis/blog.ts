// project
import type { Blog, PublishRecord } from '../typings/blog'
import { get } from '.'
import { PaginateResult } from '../typings/api'

const url = '/api/blog'

export const getBlogPublishRecord = (from: number, to: number) =>
  get<PublishRecord[]>(`${url}/publish-record`, {
    params: {
      from,
      to
    }
  })

export const getBlogs = () => {
  return get<PaginateResult<Blog>>(url)
}
