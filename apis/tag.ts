// project
import arq from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Tag } from '../typings/tag'

const url = '/api/tag'

export const getTags = () => arq.get<PaginateResult<Tag>>(url)

export const getTagById = (id: string) => arq.get<Tag>(`${url}/${id}`)
