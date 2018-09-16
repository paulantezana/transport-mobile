import React, { Component, Fragment } from "react";
import { connect } from 'dva';
import { Tabs, Icon } from 'antd';

import styles from './AppLayout.scss';
import { app as config } from 'config/app';
import Monitoring from 'routes/Monitoring';

const TabPane = Tabs.TabPane;

class AppLayout extends Component{

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({type: 'global/globalSetting'})
    }

    render(){
        return (
            <Fragment>
                <div className={styles.header}>
                    <h1>{config.name}</h1>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="google" theme="outlined" />GPS</span>} key="1">
                        <Monitoring/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="table" theme="outlined" />CONSULTAS</span>} key="2">
                        Futura funcionalidad ten paciencia
                    </TabPane>
                </Tabs>
            </Fragment>
        )
    }
}


const mapStateToProps = ({global}) => {
    return {
        global: global,
    }
}

export default connect(mapStateToProps)(AppLayout);