// project
import { get } from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Tag } from '../typings/tag'

const url = '/api/tag'

export const getTags = () => {
  const params: QueryOptions = {
    pagination: {
      pagination: false
    }
  }

  return get<PaginateResult<Tag>>(url, {
    params
  })
}
