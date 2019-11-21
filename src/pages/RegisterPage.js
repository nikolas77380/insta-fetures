import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import RegisterForm from '../components/auth/RegisterForm';
import Background from './../background.jpg';

const styles = {
    root: {
        minHeight: '800px',
    },
};

class RegisterPage extends React.Component {

    handleRegisterAction = ({email, password, confirmPassword}) => {
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <img alt="" src={Background} style={{position:"fixed", top:0, left:0, zIndex:-100}} />
                <Grid
                    className={classes.root}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <RegisterForm handleRegister={this.handleRegisterAction}/>
                </Grid>
            </div>

        );
    }

}

export default withStyles(styles)(RegisterPage);
