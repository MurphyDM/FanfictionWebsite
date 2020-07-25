import { combineReducers } from 'redux'

import { storiesReducer } from './stories/reducers'
import { userReducer} from './user/reducers'

export default combineReducers({
  stories: storiesReducer,
  user: userReducer
});