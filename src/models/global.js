import { settingGlobal, settingUpdate, settingUploadLogo } from '../services/setting';
import { mobileById } from '../services/mobile';
import { getAuthorityUser } from 'utilities/authority';
import { message } from 'antd';

export default {
    namespace: 'global',
    state: {
      collapsed: false,
      setting: {},
      user: {},
      success: false,
    },
    effects: {
        *globalSetting({ payload }, { call, put }){
            const tokenUser = getAuthorityUser();
            const response = yield call(settingGlobal,{ id: tokenUser.user.id });
            if (response.success){
                yield put({ type: 'settingSuccess', payload: response });
            }
        },
        *updateSetting({ payload }, { call, put }){
            const response = yield call(settingUpdate, payload);
            if(response.success){
                yield put({
                    type: 'updateSettingSuccess',
                    payload
                });
            }
        },
    },
    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return {...state, collapsed: payload };
        },
        settingSuccess(state, { payload }){
            return {
                ...state,
                setting: payload.setting,
                user: payload.user,
                success: payload.success
            }
        },
        updateProfileSuccess(state, action){
            return {...state, user: Object.assign({},state.user,action.payload) };
        },
        updateSettingSuccess(state, action){
            return {...state, setting: Object.assign({},state.setting,action.payload) };
        },
    }
}