import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockCircle from '@material-ui/icons/LockRounded';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import useForm from "../useForm";
import {Link} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        minWidth: 345,
        overflow:'visible',
        color:'grey'
    },
    cardHeader: {
        textAlign:'center',
        background: `linear-gradient(60deg,#ec407a,#d81b60)`,
        fontWeight: 700,
        color:'#fff',
        boxShadow:'0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(233,30,99,.4)',
        marginTop: '-40px',
        marginBottom: '20px',
        margin: '0 15px',
        padding:'30px',
        borderRadius: '5px',
    },
    footer: {
        padding:'20px',
        justifyContent:'center'
    },
    input: {
        justifyContent: 'center'
    },
    linkArea: {
        display:'flex',
        justifyContent:'center'
    }
});


export default function LoginForm({handleLogin}){
    const classes = useStyles();

    const { values, handleChange, handleSubmit } = useForm({email: "", password: ""}, fillUp);

    function fillUp() {
        handleLogin(values);
    }

    return (
        <Card className={classes.card}>
            <form onSubmit={handleSubmit}>
                <div className={classes.cardHeader}>
                    <Typography variant="h3" style={{textAlign:'center'}}>
                        Login
                    </Typography>
                    <div className={classes.linkArea}>
                        <Link href="#" >
                            Instagram
                        </Link>
                        <Link href="#" >
                            Facebook
                        </Link>
                    </div>
                </div>

                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="body2" style={{textAlign:'center'}}>
                        Or be Classic
                    </Typography>

                        <Grid container spacing={1} alignItems="flex-end" justify="center">
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField
                                       label="email..."
                                       name="email"
                                       type="email"
                                       value={values.email}
                                       onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center">
                            <Grid item>
                                <LockCircle />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="password..."
                                    value={values.password}
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                </CardContent>
                <CardActions className={classes.footer}>
                    <Button type="submit" size="small" color="primary">
                        Lets go
                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}
