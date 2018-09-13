import React from 'react';
import PromiseRender from './PromiseRender';
import { CURRENT } from './renderAuthorize';

function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function'
    );
}

/**
 * checkPermissions
 * Common check permissions method
 * @param { authority Permission judgment type string |array | Promise | Function } authority
 * @param { currentAuthority Your permission description  type:string} currentAuthority
 * @param { target Passing components } target
 * @param { Exception no pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
    // 没有判定权限.默认查看所有
    // Retirement authority, return target;
    if (!authority) {
        return target;
    }
    // 数组处理
    if (Array.isArray(authority)) {
        if (authority.indexOf(currentAuthority) >= 0) {
            return target;
        }
        if (Array.isArray(currentAuthority)) {
            for (let i = 0; i < currentAuthority.length; i += 1) {
                const element = currentAuthority[i];
                if (authority.indexOf(element) >= 0) {
                    return target;
                }
            }
        }
        return Exception;
    }

    // string 处理
    if (typeof authority === 'string') {
        if (authority === currentAuthority) {
            return target;
        }
        if (Array.isArray(currentAuthority)) {
            for (let i = 0; i < currentAuthority.length; i += 1) {
                const element = currentAuthority[i];
                if (authority.indexOf(element) >= 0) {
                    return target;
                }
            }
        }
        return Exception;
    }

    // Promise 处理
    if (isPromise(authority)) {
        return <PromiseRender ok={target} error={Exception} promise={authority} />;
    }

    // Function 处理
    if (typeof authority === 'function') {
        try {
            const bool = authority(currentAuthority);
            // 函数执行后返回值是 Promise
            if (isPromise(bool)) {
                return <PromiseRender ok={target} error={Exception} promise={bool} />;
            }
            if (bool) {
                return target;
            }
            return Exception;
        } catch (error) {
            throw error;
        }
    }
    throw new Error('unsupported parameters');
};

export { checkPermissions };

const check = (authority, target, Exception) => {
    return checkPermissions(authority, CURRENT, target, Exception);
};

export default check;
