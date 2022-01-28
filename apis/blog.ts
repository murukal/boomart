// project
import type { Blog, PublishRecord } from '../typings/blog'
import { get } from '.'
import { PaginateResult, QueryOptions } from '../typings/api'

const url = '/api/blog'

export const getBlogPublishRecord = (from: number, to: number) =>
  get<PublishRecord[]>(`${url}/publish-record`, {
    params: {
      from,
      to
    }
  })

export const getBlogs = (params: QueryOptions) => {
  console.log('params=====', params)

  return get<PaginateResult<Blog>>(url, {
    params
  })
}

export const getBlogById = (id: string) => get<Blog>(`${url}/${id}`)
