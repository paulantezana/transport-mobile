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

// Get user token
export const getAuthorityUser = ()=> {
    return decoder(getAuthority());
}

// Get profile
export const Authorized = () => {
    return getAuthorityUser().user.profile;
}

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