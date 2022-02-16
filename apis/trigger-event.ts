// third
import dayjs from 'dayjs'
// project
import { get, post } from '.'
import type { CreateTriggerEvent, TopQuery, TopResults } from '../typings/trigger-event'

const url = '/api/trigger-event'

export const create = (data: CreateTriggerEvent) => post(url, data)

/** 获取文章浏览量榜单 */
export const getEssayBrowseTop = (query: TopQuery) => {
  const to = dayjs()
  const from = to.subtract(1, 'M')

  return get<TopResults>(`${url}/top`, {
    params: {
      targetType: 'Essay',
      triggerType: 'BROWSE',
      from: +from,
      to: +to,
      limit: query.limit
    }
  })
}
