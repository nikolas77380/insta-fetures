import {auth} from './types'
import provider from './../provider/api';
import setAuthToken from "../utils/setAuthToken";
const { loginSuccess, loginFailed } = auth;

export const loadUser = () => {
    return async dispatch => {
        try{
            dispatch({type: auth.loading, payload: true});
            if(localStorage.token) {
                setAuthToken(localStorage.token);
            }
            const res = await provider.authenticate();
            if(res.error) {
                dispatch({type: auth.loginFailed});
                dispatch({type: auth.loading, payload: false});
            } else {
                dispatch({
                    type: auth.userLoaded,
                    payload: res
                });
                dispatch({type: auth.loading, payload: false});
            }
        } catch (err) {

            dispatch({type: auth.loginFailed});
            dispatch({type: auth.loading, payload: false});
        }
    }
}

export const login = ({email, password}) => {
    return async dispatch => {
        dispatch({type: auth.loading, payload: true});
        try {
            const {data} = await provider.login({email, password});
            dispatch({ type: loginSuccess, payload: data.token });
            dispatch(loadUser());
            dispatch({type: auth.loading, payload: false});
        } catch(err) {
            dispatch({type: loginFailed, payload: 'Authentication failed!'});
            dispatch({type: auth.loading, payload: false});
        }
    }
};
