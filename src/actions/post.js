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

export const getLocation = () => {
    return async dispatch => {
        try{
            dispatch({type: location.loading, payload: true});
            const locations = await provider.getLocations('Николаев, Соборная площадь');
            dispatch({type: location.setLocationsSuccess, payload: locations.data});
            dispatch({type: location.loading, payload: false});
        } catch (e) {
            dispatch({type: location.setLocationsFailed, payload: e});
            dispatch({type: location.loading, payload: false});
        }
    }
}
