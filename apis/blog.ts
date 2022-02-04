// project
import { get } from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Blog, CreativeTop5, PublishRecord } from '../typings/blog'

const url = '/api/blog'

export const getBlogPublishRecord = (from: number, to: number) =>
  get<PublishRecord[]>(`${url}/publish-record`, {
    params: {
      from,
      to
    }
  })

export const getBlogs = (params: QueryOptions) =>
  get<PaginateResult<Blog>>(url, {
    params
  })

export const getBlogById = (id: string) => get<Blog>(`${url}/${id}`)

export const getCreativeTop5 = () => get<CreativeTop5>(`${url}/creative-top5`)
