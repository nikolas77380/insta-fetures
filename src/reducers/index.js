import {combineReducers} from 'redux';

import auth from './auth';
import post from './post';
import location from './location';

const appReducer = combineReducers({
    auth: auth,
    post: post,
    location: location
});

const rootReducer = (state,action) => {
    if (action.type === 'AUTH/LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
