import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'
import mreducer from './mreducer'


rootReducer = combineReducers({measurments: mreducer, initialinfo: reducer})
// This would produce the following state object
// {
//  measurments: {
    // ... potatoes, and other state managed by the potatoReducer ...
//   }
//  initialinfo: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
//   }
// }
export default createStore(
 
  reducer,
  composeWithDevTools(applyMiddleware(combineReducers(promiseMiddleware)))