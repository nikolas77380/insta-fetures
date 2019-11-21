import {auth} from './types'
import provider from './../provider/api';

const { loading, loginSuccess, loginFailed } = auth;

export const login = ({email, password}) => {
    return async dispatch => {
        dispatch({type: loading});
        try {
            const data = await provider.login({email, password});
            sessionStorage.setItem('token', data.token);
            dispatch({type: loginSuccess, payload: data.token});

        } catch(err) {
            dispatch({type: loginFailed, payload: err})
        }
    }
};

export const loginByAccessToken = () => {
    return async dispatch => {
        const storedAccessToken = sessionStorage.getItem('token');
        if (!storedAccessToken)
            return;
        try{
            const data = await provider.loginByAccessToken(storedAccessToken);
            dispatch({type: loginSuccess, payload: storedAccessToken});
        } catch(err) {
            console.error(err)
            dispatch({type: loginFailed, payload: err})
        }
    }
}
