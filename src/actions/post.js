import {post, location} from './types'
import provider from './../provider/api';
import setAuthToken from "../utils/setAuthToken";
const { loading, setFilesSuccess, setFilesFailed } = post;
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

export const setCaption = (caption) => {
  return async dispatch => {
      try{
          dispatch({type: loading, payload: true});
            dispatch({type: post.setCaption, payload: caption})
          dispatch({type: loading, payload: false});
      } catch (e) {
          dispatch({type: post.captionSetFailed, payload: caption})
          dispatch({type: loading, payload: false});
      }
  }
};

export const saveImage = (blobImage) => {
    return async dispatch => {
        try{
            // save image api
        } catch (e) {

        }
    }
}

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
