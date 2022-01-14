// redux
import { createStore } from 'redux'
// project
import reducer from './reducer'

/**
 * 项目下的redux树
 */
export interface State {}

const store = createStore(reducer)

export default store
