// project
import { get } from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Essay, CreativeTop5, PublishRecord } from '../typings/essay'

const url = '/api/essay'

export const getEssayPublishRecord = (from: number, to: number) =>
  get<PublishRecord[]>(`${url}/publish-record`, {
    params: {
      from,
      to
    }
  })

export const getEssays = (params: QueryOptions) =>
  get<PaginateResult<Essay>>(url, {
    params
  })

export const getEssayById = (id: string) => get<Essay>(`${url}/${id}`)

export const getCreativeTop5 = () => get<CreativeTop5>(`${url}/creative-top5`)
