import {post} from './../actions/types';


const initialState = {
    loading: false,
    files: null,
    list: [],
    uploadFile: null,
    filter: '',
    caption: '',
    location: {},
    hashtags: [],
    users: []
};

export default function Post(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case post.loading:
            return {
                ...state,
                loading: payload
            };
        case post.resetFlow:
            return initialState;
        case post.setUploadFileSuccess:
            return {
                ...state,
                uploadFile: payload
            };
        case post.setPostsSuccess:
            return {
                ...state,
                list: payload
            };
        case post.setPostsFailed:
            return {
                ...state,
                list: []
            };
        case post.setUploadFileFailed:
            return {
                ...state,
                uploadFile: null

            };
        case post.setFilesSuccess:
            return {
                ...state,
                files: payload
            };
        case post.setFilesFailed:
            return {
                ...state,
                files: null

            };
        case post.setLocation:
            return {
                ...state,
                location: payload

            };
        case post.setCaption:
            return {
                ...state,
                caption: payload
            };
        case post.captionSetFailed:
            return {
                ...state,
                caption: ''
            };
        case post.setHashtags:
            return {
                ...state,
                hashtags: payload
            }
        case post.clearHashtags:
            return {
                ...state,
                hashtags: []
            }
        default:
            return state
    }
    return state;
}
