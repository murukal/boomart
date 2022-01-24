import { get } from '.'

const url = '/api/blog'

export const getBlogPublishRecord = (from: number, to: number) =>
  get(`${url}/publish-record`, {
    params: {
      from,
      to
    }
  })
