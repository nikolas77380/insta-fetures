import {error} from './../actions/types';


const initialState = {
   error: null
};

export default function Error(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case error.setError:
            return {
                ...state,
                error: payload
            };
        case error.clearError:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
    return state;
}
