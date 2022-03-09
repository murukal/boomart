// project
import requests, { FetchParams } from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Essay, CreativeTop5 } from '../typings/essay'

const url = '/api/essay'

export const getEssays = (params: FetchParams) => requests.get<PaginateResult<Essay>>(url, params)

export const getEssay = (id: string) => requests.get<Essay>(`${url}/${id}`)

export const getCreativeTop5 = () => requests.get<CreativeTop5>(`${url}/creative-top5`)

/** 获取最新文章的参数构造函数 */
export const getFetchLatestParams = (page: number = 1) => ({
  params: {
    pagination: {
      limit: 4,
      page
    },
    populate: ['tags', 'createdBy', 'isThumbUp', 'isFavorite']
  }
})

const apis = {}

export default apis
