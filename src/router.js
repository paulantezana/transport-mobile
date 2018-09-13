import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { PrivateRoute } from 'utilities/authority';

const { ConnectedRouter } = routerRedux;

import UserLayout from './layouts/UserLayout';
import AppLayout from './layouts/AppLayout';
import ExeptionLayout from './layouts/ExeptionLayout';

function RouterConfig({ history }) {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/user" component={UserLayout}/>
                <Route path="/exception" component={ExeptionLayout}/>
                <PrivateRoute path="/" component={AppLayout}/>
            </Switch>
        </ConnectedRouter>
    );
}

export default RouterConfig;