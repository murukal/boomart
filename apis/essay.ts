// project
import requests, { FetchParams } from '.'
import type { PaginateResult } from '../typings/api'
import type { Essay } from '../typings/essay'

const url = '/api/essay'

/** 查询多个文章 */
export const getEssays = (params: FetchParams) => requests.get<PaginateResult<Essay>>(url, params)

/** 查询单个文章 */
export const getEssay = (id: string) => requests.get<Essay>(`${url}/${id}`)

/** 查询最近的4篇文章 */
export const getLatest = async (page: number = 1) => {
  return await requests.get<PaginateResult<Essay>>('/api/essay', {
    params: {
      pagination: {
        limit: 4,
        page
      },
      populate: ['tags', 'createdBy', 'isThumbUp', 'isFavorite']
    }
  })
}
