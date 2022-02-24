// third
import dayjs from 'dayjs'
// project
import arq from '.'
import type { CreateToggle, TopQuery, TopResults } from '../typings/toggle'

const url = '/api/trigger-event'

export const create = (data: CreateToggle) => arq.post(url, data)

/** 获取文章浏览量榜单 */
export const getEssayBrowseTop = (query: TopQuery) => {
  const to = dayjs()
  const from = to.subtract(1, 'M')

  return arq.get<TopResults>(`${url}/top`, {
    params: {
      targetType: 'Essay',
      triggerType: 'BROWSE',
      from: +from,
      to: +to,
      limit: query.limit
    }
  })
}
