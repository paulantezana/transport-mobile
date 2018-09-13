import request from '../utilities/request';

const SETTING_API = '/setting';

// Get ByID settings
export async function settingOnly() { 
    return request(`${SETTING_API}`,{
        method: 'GET',
    })
}

// Get Global settings
export async function settingGlobal(body) { 
    return request(`${SETTING_API}/global`,{
        method: 'POST',
        body,
    })
}

// Update settings
export async function settingUpdate(body) { 
    return request(`${SETTING_API}/update`,{
        method: 'PUT',
        body,
    })
}

// POST upload logo
export async function settingUploadLogo(body) { 
    return request(`${SETTING_API}/upload/logo`,{
        method: 'POST',
        body
    })
}

// DOWLOAND
export async function settingDownloadLogo() { 
    return dowloandFetch(`${SETTING_API}/download/logo`,{
        method: 'GET',
    })
}