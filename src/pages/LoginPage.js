import React from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../components/auth/LoginForm';
import Background from './../background.jpg';

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
        const {classes} = this.props;
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
    return null;
    // return {
    //     token: state.auth.token
    // }
};

export default connect(mapStateToProps(), {login})(withStyles(styles)(LoginPage));
