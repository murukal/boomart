// redux
import { combineReducers } from 'redux'
// project
import userProfile from './userProfile/reducer'
import tags from './tags/reducer'

const reducer = combineReducers({
  userProfile,
  tags
})

export default reducer
