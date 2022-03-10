// project
import { getTags } from '../../apis/tag'
import type { Tag } from '../../typings/tag'

export type ActionType = 'FETCH'

export interface Action {
  type: ActionType
  data: Tag[]
}

// 获取到token之后，进行用户的认证
export const fetch = async (): Promise<Action> => {
  // 读取用户信息
  const res = await getTags()

  // 生成token
  return {
    type: 'FETCH',
    data: res.data?.docs || []
  }
}
