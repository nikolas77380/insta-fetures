import {post} from './../actions/types';


const initialState = {
    loading: false,
    files: null,
    filter: '',
    caption: '',
    location: '',
    users: []
};

export default function Auth(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case post.loading:
            return {
                ...state,
                loading: true
            }
        case post.setFilesSuccess:
            return {
                ...state,
                loading: false,
                files: payload
            }
        case post.setFilesFailed:
            return {
                ...state,
                loading: false,
                files: null

            }
        case post.setCaption:
            return {
                ...state,
                loading: false,
                caption: payload
            }
        case post.captionSetFailed:
            return {
                ...state,
                loading: false,
                caption: ''
            }
        default:
            return state
    }
    return state;
}
