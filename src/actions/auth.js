import {auth} from './types'
import provider from './../provider/api';
import setAuthToken from "../utils/setAuthToken";
const { loading, loginSuccess, loginFailed, userLoaded } = auth;

export const loadUser = () => {
    return async dispatch => {
        try{
            if(localStorage.token) {
                setAuthToken(localStorage.token);
            }
            const res = await provider.authenticate();
            if(res.error) {
                dispatch({type: auth.loginFailed});
            } else {
                dispatch({
                    type: auth.userLoaded,
                    payload: res
                });
            }
        } catch (err) {
            dispatch({type: auth.loginFailed});
        }
    }
}

export const login = ({email, password}) => {
    return async dispatch => {
        dispatch({type: loading});
        try {
            const data = await provider.login({email, password});
            dispatch({ type: loginSuccess, payload: data.token });
            dispatch(loadUser());
        } catch(err) {
            dispatch({type: loginFailed, payload: err})
        }
    }
};
