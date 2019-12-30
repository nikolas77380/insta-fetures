import {post, location} from './types'
import provider from './../provider/api';
import setAuthToken from "../utils/setAuthToken";
const { loading, setFilesSuccess, setFilesFailed, setUploadFileSuccess, setUploadFileFailed } = post;
export const setFiles = (file) => {
    return async dispatch => {
        try{
            dispatch({type: loading});
            dispatch({type: setFilesSuccess, payload: file});
        } catch (err) {
            dispatch({type: setFilesFailed});
        }
    }
};

export const setDownloadFile= (file) => {
    return async dispatch => {
        try{
            dispatch({type: loading});
            dispatch({type: setUploadFileSuccess, payload: file});
        } catch (err) {
            dispatch({type: setUploadFileFailed});
        }
    }
};

export const setCaption = (caption) => {
  return async dispatch => {
          dispatch({type: loading, payload: true});
          dispatch({type: post.setCaption, payload: caption})
          dispatch({type: loading, payload: false});
  }
};

export const setLocation = (location) => {
    return async dispatch => {
        dispatch({type: loading, payload: true});
        dispatch({type: post.setLocation, payload: location})
        dispatch({type: loading, payload: false});
    }
};

export const getLocation = (searchString) => {
    return async dispatch => {
        try{
            dispatch({type: location.loading, payload: true});
            let responseData;
            const {data} = await provider.getLocations(searchString);
            if (typeof data == 'object' && Object.keys(data) === 0  || data === undefined) {
                responseData = [];
            } else {
                responseData = data;
            }

            dispatch({type: location.setLocationsSuccess, payload: responseData});
            dispatch({type: location.loading, payload: false});
        } catch (e) {
            dispatch({type: location.setLocationsFailed, payload: e});
            dispatch({type: location.loading, payload: false});
        }
    }
};

export const clearLocation = () => {
    return async dispatch => {
        dispatch({type: location.loading, payload: true});
        dispatch({type: location.setLocationsSuccess, payload: []});
        dispatch({type: location.loading, payload: false});
    }
};


export const getHashtags = (searchString) => {
    return async dispatch => {
        dispatch({type: post.loading, payload: true});
        const hashtags = await provider.getHashtags(searchString);
        dispatch({type: post.setHashtags, payload: hashtags});
        dispatch({type: post.loading, payload: false});
    }
};

export const clearHashtags = () => {
    return async dispatch => {
        dispatch({type: post.loading, payload: true});
        dispatch({type: post.clearHashtags});
        dispatch({type: post.loading, payload: false});
    }
}

export const getPosts = () => {
    return async dispatch => {
        dispatch({type: post.loading, payload: true});
        try{
            const posts = await provider.getPosts();
            dispatch({type: post.setPostsSuccess, payload: posts});
            dispatch({type: post.loading, payload: false});
        } catch(e) {
            dispatch({type: post.setPostsFailed})
            dispatch({type: post.loading, payload: false});
        }
    }
}

export const createPost = () => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            dispatch({type: post.loading, payload: true});
            await provider.createPost({
                caption: state.post.caption,
                location: state.post.location,
                uploadFile: state.post.uploadFile
            });
            dispatch({type: post.resetFlow});
            dispatch({type: post.loading, payload: false});
        } catch (e) {

        }
    }
}

export const schedulePost = (postData) => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: post.loading, payload: true});
            const {_id, start} = postData
            const data = {id: _id, start};
            await provider.schedulePost(data);
            dispatch(getPosts());
        }catch(e) {
            dispatch({type: post.resetFlow});
            dispatch({type: post.loading, payload: false});
        }
    }
}
