import { mobileLogin } from '../services/mobile';
import { Modal, message } from 'antd';
import { setAuthority } from '../utilities/authority';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'mobile',
    state: {
    },
    effects: {
        *login({ payload }, { call, put }){
            const response = yield call(mobileLogin,payload);
            if(response.success){
                setAuthority(response.data.token);
                yield put(routerRedux.push('/'));
                message.success(response.message);
            }else{
                Modal.error({title: "Algo salió mal",content: response.message})
            }
        },
    },
}