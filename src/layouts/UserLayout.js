import React from "react";
import { Redirect, Switch, Route } from 'dva/router';
import styles from './UserLayout.scss';
import LoginPage from '../routes/User/Login';
class UserLayout extends React.PureComponent {
    render(){
        const { match } = this.props;
        return (
            <div className={styles.container}>
                <Switch>
                    <Route exact path={`${match.url}/login`} component={LoginPage}/>
                    <Redirect from="/user" to="/user/login" />
                </Switch>
            </div>
        )
    }
}

export default UserLayout;