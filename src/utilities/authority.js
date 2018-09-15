import React from 'react';
import { Route, Redirect } from 'dva/router';
import decoder from 'jwt-decode';

// Authentication key use save token
const ATUH_KEY = "/&AV(";

// Get token
export const getAuthority = ()=> {
    let token = localStorage.getItem(ATUH_KEY);
    return token;
};
  
// Set token
export const setAuthority = (token) => {
    localStorage.setItem(ATUH_KEY,token);
}

// Get mobile token
export const getAuthorityMobile = ()=> {
    return decoder(getAuthority());
}

// Get profile
export const Authorized = () => {
    return getAuthorityMobile().mobile.profile;
}

// Private route
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        getAuthority()
            ? ( <Component {...props} /> )
            : ( <Redirect to={{
                pathname: "/user/login",
                state: { from: props.location }
            }}
          />
        )
      }
    />
);

// Logout
export const destroy = ()=>{
    localStorage.clear();
};