import React from 'react';
import {Redirect} from 'react-router-dom';
import store from './../store';

export default function RequireAuth(WrappedComponent) {
    return function(props) {
        const isAuthenticated = store.getState().auth.isAuthenticated;
        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        }

        return <Redirect to={'/login'} />;
    };
}
