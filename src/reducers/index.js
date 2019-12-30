import {combineReducers} from 'redux';

import auth from './auth';
import post from './post';
import location from './location';
import error from './error';

const appReducer = combineReducers({
    auth: auth,
    post: post,
    location: location,
    error: error
});

const rootReducer = (state,action) => {
    if (action.type === 'AUTH/LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
