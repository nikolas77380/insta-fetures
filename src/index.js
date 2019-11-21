import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import {loginByAccessToken} from './actions/auth';

//Dispatch login action
store.dispatch(loginByAccessToken());

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#e91e63',
        },
        secondary: {
            main: 'rgb(55, 46, 142)',
        },
    },
    typography: {
        h1: {fontSize: '3rem'},
        h2: {fontSize: '2.35rem'},
        h3: {fontSize: '1.85rem'},
        h4: {fontSize: '1.6rem'},
        h5: {fontSize: '1.35rem'},
        useNextVariants: true,
    },
});
window.theme = theme;
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <App/>
                </ThemeProvider>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
