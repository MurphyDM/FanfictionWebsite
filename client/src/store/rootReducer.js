import { combineReducers } from 'redux'

import { storiesReducer } from './stories/reducers'

export default combineReducers({
  stories: storiesReducer
});