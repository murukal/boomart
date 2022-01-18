// redux
import { createStore } from 'redux'
// project
import reducer from './reducer'
import { UserProfile } from './userProfile/store'

/**
 * 项目下的redux树
 */
export interface State {
  userProfile: UserProfile
}

const store = createStore(reducer)

export default store
