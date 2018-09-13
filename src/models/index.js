import global from './global';
import mobile from './mobile';

const models = app => {
    app.model(global);
    app.model(mobile);
}

export default models;