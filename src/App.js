import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import store from './store';
import LoginPage from './pages/LoginPage'
import RegisterPage from "./pages/RegisterPage";
import SchedulerPage from "./pages/Scheduler";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";

import RequireAuth from './utils/requiresAuth';
import LandingPage from "./pages/LandingPage";

if(localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser())
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/scheduler" component={RequireAuth(SchedulerPage)}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
