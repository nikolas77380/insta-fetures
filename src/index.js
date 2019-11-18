import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ADD8E6',
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
                <App/>
            </ThemeProvider>
    </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
