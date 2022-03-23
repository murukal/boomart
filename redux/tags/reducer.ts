import getInitialState from './store'
import type { Action } from './action'

const reducer = (state = getInitialState(), action: Action) => {
  switch (action.type) {
    case 'SET_TAGS':
      // 获取tags
      return action.data
    default:
      // 未被监测到的action
      return state
  }
}

export default reducer
