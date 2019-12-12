import {location} from './../actions/types';


const initialState = {
    loading: false,
    list: [],
    error: null
};

export default function Location(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case location.loading:
            return {
                ...state,
                loading: payload
            }
        case location.setLocationsSuccess:
            return {
                ...state,
                list: payload
            }
        case location.setLocationsFailed:
            return {
                ...state,
                error: payload

            }
        default:
            return state
    }
    return state;
}
