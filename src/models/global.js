import { settingGlobalMobile, settingUpdate, settingUploadLogo } from '../services/setting';
import { mobileById } from '../services/mobile';
import { getAuthorityMobile } from 'utilities/authority';
import { message } from 'antd';

export default {
    namespace: 'global',
    state: {
      collapsed: false,
      setting: {},
      mobile: {},
      success: false,
    },
    effects: {
        *globalSetting({ payload }, { call, put }){
            const tokenMobile = getAuthorityMobile();
            const response = yield call(settingGlobalMobile,{ id: tokenMobile.mobile.id });
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
                mobile: payload.mobile,
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