import React from 'react';
import {Redirect} from 'react-router-dom';
import store from './../store';
import {Typography} from "@material-ui/core";

export default function RequireAuth(WrappedComponent) {
    return function(props) {
        const isAuthenticated = store.getState().auth.isAuthenticated;
        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        } else {
            return <Redirect to={'/login'} />;
        }

        return <Typography>Loading</Typography>

    };
}
