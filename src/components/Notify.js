import SnackbarContent from "@material-ui/core/SnackbarContent";
import clsx from "clsx";
import { amber, green } from "@material-ui/core/colors";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {makeStyles} from "@material-ui/core";
import React, {useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                  <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            {...other}
        />
    );
}
const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
};

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: "flex",
        alignItems: "center"
    }
}));

export const Notification = ({type, text}) => {
    const [open, handleOpen] = useState(true);
    const handleClose = () => {
        handleOpen(false)
    }
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
            autoHideDuration={3000}
        >
            <MySnackbarContentWrapper
                variant={type}
                message={text}
            />
        </Snackbar>
    )
}
