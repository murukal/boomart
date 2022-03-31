// project
import { getTags } from '../../apis/tag'
import type { Tag } from '../../typings/tag'

export type ActionType = 'SET_TAGS'

export interface Action {
  type: ActionType
  data: Tag[]
}

/** 在redux中存储tags */
export const setTags = async (): Promise<Action> => {
  // 利用api获取tags
  const { data } = await getTags()

  // 生成token
  return {
    type: 'SET_TAGS',
    data: data?.tags.items || []
  }
}
