import dva from 'dva';
import { createBrowserHistory } from 'history';
import createLoading from 'dva-loading';

import models from './models';
import './index.scss';

// 1. Initialize
const app = dva({
    history: createBrowserHistory()
});

// 2. Plugins
app.use(createLoading());

// 3. Register models
models(app);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line