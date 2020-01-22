import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import {createBrowserHistory} from 'history';
import setAuthToken from "./../utils/setAuthToken";

// import components
import routes from './routes'
import PrivateRoute from './Private'
import PublicRoute from './Public'
import {loadUser} from "../actions/auth";
import Layout from './../layout';
import {Typography} from "@material-ui/core";

// import Layout from '../layout'

if(localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
}
const history = createBrowserHistory();

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const {auth} = this.props;
    const {loading} = auth;
    if (loading) {
      return <Typography>Loading...</Typography>;
    }
    return <>
         <Router hisotry={history}>
           <Layout authed={auth.isAuthenticated}>
            <Switch>
               {routes.map((route, i) => {
                  if (route.auth) {
                    return <PrivateRoute authed={auth.isAuthenticated} key={i} {...route} />
                  }
                  return <PublicRoute routeAuth={route.auth} authed={auth.isAuthenticated} key={i} {...route} />
                })}
            </Switch>
          </Layout>
       </Router>
  </>

  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {loadUser})(Routes);
