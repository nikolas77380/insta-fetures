import {combineReducers} from 'redux';

import auth from './auth';
import post from './post';

const appReducer = combineReducers({
    auth: auth,
    post: post
});

const rootReducer = (state,action) => {
    if (action.type === 'AUTH/LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
