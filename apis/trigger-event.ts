// third
import dayjs from 'dayjs'
// project
import { get, post } from '.'
import type { CreateTriggerEvent, TopQuery, TopResults } from '../typings/trigger-event'

const url = '/api/trigger-event'

export const create = (data: CreateTriggerEvent) => post(url, data)

/** 获取博客浏览量榜单 */
export const getBlogBrowseTop = (query: TopQuery) => {
  const to = dayjs()
  const from = to.subtract(1, 'M')

  return get<TopResults>(`${url}/top`, {
    params: {
      targetType: 'Blog',
      triggerType: 'BROWSE',
      from: +from,
      to: +to,
      limit: query.limit
    }
  })
}
