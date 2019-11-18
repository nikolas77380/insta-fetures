import {applyMiddleware, compose, createStore} from 'redux';

import {createLogger} from 'redux-logger';

import promise from 'redux-promise';
import rootReducer from './reducers';

const logger = createLogger({
    collapsed: true,
});



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(promise, logger)));

export default store;

window.Store = store;
