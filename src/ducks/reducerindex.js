import { combineReducers } from 'redux'
import reducer from './reducer'
import mreducer from './mreducer'

export default combineReducers({
  reducer,
  mreducer
})