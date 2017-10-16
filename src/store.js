import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import api     from './api';
import history from './module/history';
import reduxState  from './module/redux-state';

//---------------------------------
// Middlewares
//---------------------------------

import thunk from 'redux-thunk';
import reduxStateMiddleware from './module/redux-state/middleware';

const middlewares = [thunk, reduxStateMiddleware];

if (typeof __DEV__ !== 'undefined' && __DEV__ === true) {
    const createLogger = require('redux-logger').createLogger;
    const logger = createLogger({
        duration: true,
        timestamp: false,
        collapsed: true
    });

    middlewares.push(logger);
}


//---------------------------------
// Reducers
//---------------------------------

import session from './container/session/_reducer';
import menu    from './container/menu/_reducer';

const createReducer = (asyncReducers) => {
  return combineReducers({
    session : session,	//we need at least one reducer from the scratch 
    menu    : menu,	//to prevent warning "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers."
			//at the very first call (before any reducer added)
    ...asyncReducers
  });
}

//---------------------------------
// Store
//---------------------------------

reduxState.config([
    {id:'session', default : undefined},
    {id:'menu',    default : undefined},
]);

const store = createStore(
    createReducer(), 
    reduxState.load(),
    compose(
        applyMiddleware(...middlewares)
    )
);

store.asyncReducers = {};

//look at http://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application
export function injectAsyncReducer(name, asyncReducer) {
  if (!store.asyncReducers[name]) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  }
}

history.setDispatch(store.dispatch);
api.setDispatch(store.dispatch);

export default store
