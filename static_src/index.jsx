import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import App from './components/App';
import initStore from './utils/store';

const history = createHistory();
const middleware = routerMiddleware(history);

ReactDom.render(
    <Provider store={initStore([middleware])}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider>
                <App/>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);