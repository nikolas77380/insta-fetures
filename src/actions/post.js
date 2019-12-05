import {post} from './types'
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
          dispatch({type: loading});
          dispatch({type: post.setCaption, payload: caption})
      } catch (e) {
          dispatch({type: post.captionSetFailed, payload: caption})
      }
  }
};
