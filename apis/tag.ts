// project
import requests from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Tag } from '../typings/tag'

const url = '/api/tag'

export const getTags = () => requests.get<PaginateResult<Tag>>(url)

export const getTagById = (id: string) => requests.get<Tag>(`${url}/${id}`)
