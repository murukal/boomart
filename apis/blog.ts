// project
import type { PublishRecord } from '../typings/blog'
import { get } from '.'

const url = '/api/blog'

export const getBlogPublishRecord = (from: number, to: number) =>
  get<PublishRecord[]>(`${url}/publish-record`, {
    params: {
      from,
      to
    }
  })

export const getBlogs = () => {
  return get(url)
}
