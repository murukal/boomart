// project
import requests from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Essay, CreativeTop5, PublishRecord } from '../typings/essay'

const url = '/api/essay'

export const getEssayPublishRecord = (from: number, to: number) =>
  requests.get<PublishRecord[]>(`${url}/publish-record`, {
    params: {
      from,
      to
    }
  })

export const getEssays = (params: QueryOptions) =>
  requests.get<PaginateResult<Essay>>(url, {
    params
  })

export const getEssay = (id: string) => requests.get<Essay>(`${url}/${id}`)

export const getCreativeTop5 = () => requests.get<CreativeTop5>(`${url}/creative-top5`)
