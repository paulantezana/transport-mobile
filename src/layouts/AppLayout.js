import React, { Component, Fragment } from "react";
import { connect } from 'dva';
import { Tabs } from 'antd';
import { Link, Switch, routerRedux } from 'dva/router';

import { PrivateRoute } from 'utilities/authority';
import classNames from 'classnames';
import Preload from 'components/Preload';
import Exception from 'components/Exception';

import logoWhite from 'assets/logo-white.png';
import logo from 'assets/logo.png';
import { app as appConfig } from 'config/app';

import Monitoring from 'routes/Monitoring';

const TabPane = Tabs.TabPane;

class AppLayout extends Component{
    render(){
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="GPS" key="1">
                    <Monitoring/>
                </TabPane>
                <TabPane tab="CONSULTAS" key="2">Futura funcionalidad ten paciencia</TabPane>
            </Tabs>
        )
    }
}


const mapStateToProps = ({global}) => {
    return {
        global: global,
    }
}

export default connect(mapStateToProps)(AppLayout);