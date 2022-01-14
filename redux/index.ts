// redux
import { createStore } from 'redux'
// project
import reducer from './reducer'

/**
 * 项目下的redux树
 */
export interface State {
  tenant: TenantState
  menus: MenuTreeNode[]
  userProfile: UserProfile
}

const store = createStore(reducer)

export default store
