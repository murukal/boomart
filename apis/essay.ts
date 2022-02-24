// project
import arq from '.'
import type { PaginateResult, QueryOptions } from '../typings/api'
import type { Essay, CreativeTop5, PublishRecord } from '../typings/essay'

const url = '/api/essay'

export const getEssayPublishRecord = (from: number, to: number) =>
  arq.get<PublishRecord[]>(`${url}/publish-record`, {
    params: {
      from,
      to
    }
  })

export const getEssays = (params: QueryOptions) =>
  arq.get<PaginateResult<Essay>>(url, {
    params
  })

export const getEssayById = (id: string) => arq.get<Essay>(`${url}/${id}`)

export const getCreativeTop5 = () => arq.get<CreativeTop5>(`${url}/creative-top5`)
