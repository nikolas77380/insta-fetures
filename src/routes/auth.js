// import lib
import React from "react";
import Loadable from 'react-loadable'
import {Typography} from "@material-ui/core";

const LoadingComponent = () => {
    return <Typography>Loading</Typography>;
};

export default [
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Loadable({
            loader: () => import('../pages/LoginPage'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Loadable({
            loader: () => import('../pages/RegisterPage'),
            loading: LoadingComponent,
        }),
    },
]
