import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LoginPage from './pages/LoginPage'
import RegisterPage from "./pages/RegisterPage";
import SchedulerPage from "./pages/Scheduler";

const App = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/scheduler" component={SchedulerPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
