import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LoginPage from './pages/LoginPage'
import SchedulerPage from "./pages/Scheduler";

const App = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/scheduler" component={SchedulerPage}/>
                <Route exact path="/" component={LoginPage}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
