import {auth} from './../actions/types';


const initialState = {
    user: null,
    token: null,
    loggingIn: false,
    loginError: null,
};

export default function todoApp(state = initialState, action) {
    switch (action.type) {
        case auth.loading:
          return {
              ...state,
              loggingIn: true
          }
        default:
            return state
    }
}
