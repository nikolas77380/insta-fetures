import {auth} from './../actions/types';


const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    isAuthenticated: null,
};

export default function Auth(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case auth.loading:
            return {
                ...state,
                loading: true
            }
        case auth.userLoaded:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
            }
        case auth.loginSuccess:
            localStorage.setItem('token', payload)
            return {
                ...state,
                token: payload,
                loading: false,
                isAuthenticated: true
            }
        case auth.loginFailed:
        case auth.registerFailed:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                loading: false,
                isAuthenticated: false,

            }
        case auth.authError:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                loading: false,
                isAuthenticated: false,

            }
        default:
            return state
    }
    return state;
}
