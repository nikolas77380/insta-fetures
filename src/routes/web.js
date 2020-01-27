// import lib
import Loadable from 'react-loadable'

import {Typography} from "@material-ui/core";
import React from "react";

const LoadingComponent = () => {
    return <Typography>Loading</Typography>;
}

const routes = [
    {
        path: '/scheduler',
        exact: true,
        auth: true,
        component: Loadable({
            loader: () => import('../pages/Scheduler'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => import('../pages/landing/Home'),
            loading: LoadingComponent,
        }),
    },
]

export default routes
