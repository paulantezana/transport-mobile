import React, { Component } from "react";
import { Route, Switch, Link } from 'dva/router';
import Exception from 'components/Exception';

const Exeption403 = () => <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
const Exeption404 = () => <Exception type="404" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
const Exeption500 = () => <Exception type="500" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />

class ExeptionLayout extends Component{
    render(){
        const { match } = this.props;
        console.log(match);
        return (
            <Switch>
                <Route exact path={`${match.url}/403`} component={Exeption403}/>
                <Route exact path={`${match.url}/500`} component={Exeption500}/>
                <Route component={Exeption404}/>
            </Switch>
        )
    }
}

export default ExeptionLayout;