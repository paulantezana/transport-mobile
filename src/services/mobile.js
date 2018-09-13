import request from '../utilities/request';

const MOBILE_API = '/mobile';

// mobile Login
export async function mobileLogin(body) {
    return request(`/public${MOBILE_API}/login`,{
        method: 'POST',
        body
    })
}

// Update mobile
export async function mobileResetPassword(body) { 
    return request(`${MOBILE_API}/reset/password`,{
        method: 'POST',
        body
    })
}

// Get all mobiles
export async function mobileAll(body) { 
    return request(`${MOBILE_API}/all`,{
        method: 'POST',
        body
    })
}

// Get ByID mobile
export async function mobileById(body) { 
    return request(`${MOBILE_API}/by/id`,{
        method: 'POST',
        body
    })
}

// Create mobile
export async function mobileCreate(body) { 
    return request(`${MOBILE_API}/create`,{
        method: 'POST',
        body
    })
}

// Update mobile
export async function mobileUpdate(body) { 
    return request(`${MOBILE_API}/update`,{
        method: 'PUT',
        body
    })
}

// Delete mobile
export async function mobileDelete(body) { 
    return request(`${MOBILE_API}/delete`,{
        method: 'DELETE',
        body
    })
}
