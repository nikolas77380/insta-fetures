import {auth} from './types'

export const login = (username, password) => {
    return async dispatch => {
        dispatch(auth.loading())
    }
}
