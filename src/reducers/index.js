import {combineReducers} from 'redux';

import auth from './auth';

const appReducer = combineReducers({
    auth: auth,
});

const rootReducer = (state,action) => {
    if (action.type === 'AUTH/LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
