import {post} from './../actions/types';


const initialState = {
    loading: false,
    files: null,
    filter: '',
    caption: '',
    location: '',
    users: []
};

export default function Post(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case post.loading:
            return {
                ...state,
                loading: payload
            }
        case post.setFilesSuccess:
            return {
                ...state,
                files: payload
            }
        case post.setFilesFailed:
            return {
                ...state,
                files: null

            }
        case post.setCaption:
            return {
                ...state,
                caption: payload
            }
        case post.captionSetFailed:
            return {
                ...state,
                caption: ''
            }
        default:
            return state
    }
    return state;
}
