import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'
import mreducer from './mreducer'


const rootReducer = combineReducers({
  measurements: mreducer, 
  initialinfo: reducer
})
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
//export default createStore(rootReducer , composeWithDevTools(applyMiddleware(combineReducers(promiseMiddleware))))


// import {createStore, combineReducers} from 'redux';
// import authReducer from './authReducer';
// import menuReducer from './menuReducer';
// import { devToolsEnhancer } from 'redux-devtools-extension';

// const rootReducer = combineReducers({
//     authReducer: authReducer,
//     menuReducer: menuReducer
// })

// export default createStore(rootReducer, devToolsEnhancer());