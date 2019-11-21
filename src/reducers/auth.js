import {auth} from './../actions/types';


const initialState = {
    user: null,
    token: null,
    loggingIn: false,
    loginError: null,
};

export default function Auth(state = initialState, action) {
    switch (action.type) {
        case auth.loading:
            return {
                ...state,
                loggingIn: true
            }
        case auth.loginSuccess:
            return {
                ...state,
                token: action.payload,
                loggingIn: false
            }
        case auth.loginFailed:
            return {
                ...state,
                loggingIn: false,
                loginError: action.payload
            }
        default:
            return state
    }
    return state;
}
