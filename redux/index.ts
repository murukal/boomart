// redux
import { createStore } from 'redux'
// project
import reducer from './reducer'
import type { UserProfile } from './userProfile/store'
import type { Tag } from '../typings/tag'

/**
 * 项目下的redux树
 */
export interface State {
  userProfile: UserProfile
  tags: Tag[]
}

const store = createStore(reducer)

export default store
