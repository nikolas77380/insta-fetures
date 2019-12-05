import React from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../components/auth/LoginForm';
import Background from './../background.jpg';
import SchedulerPage from "./Scheduler";
import {login} from './../actions/auth';

const styles = {
    root: {
      minHeight: '800px',
    },
};

class LoginPage extends React.Component {

    handleLoginAction = ({email, password}) => {
        this.props.login({email,password});
    };

    render() {
        const {classes, isAuthenticated} = this.props;

        if(isAuthenticated) {
            return <Redirect to={'/scheduler'} />
        }

        return (
            <div className={classes.root} >
                <img alt="" src={Background} style={{position:"fixed", top:0, left:0, zIndex:-100}} />
                <Grid
                    className={classes.root}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <LoginForm handleLogin={this.handleLoginAction}/>
                </Grid>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps, {login})(withStyles(styles)(LoginPage));
