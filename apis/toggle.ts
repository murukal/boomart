// third
import dayjs from 'dayjs'
// project
import requests from '.'
import type { CreateToggle, TopQuery, TopResults } from '../typings/toggle'

const url = '/api/toggle'

export const create = (data: CreateToggle) => requests.post(url, data)

/** 获取文章浏览量榜单 */
export const getEssayBrowseTop = (query: TopQuery) => {
  const to = dayjs()
  const from = to.subtract(1, 'M')

  return requests.get<TopResults>(`${url}/top`, {
    params: {
      targetType: 'Essay',
      toggleType: 'BROWSE',
      from: +from,
      to: +to,
      limit: query.limit
    }
  })
}
