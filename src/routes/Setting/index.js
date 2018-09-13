import React, { Component } from "react";
import { connect } from 'dva';
import { Card, Divider, Row, Col } from 'antd';
import SettingForm from './Form';
import UploadLogo from './UploadLogo';

class Setting extends Component{
    render(){
        return (
            <Card bordered={false}>
                <Row gutter={24}>
                    <Col xs={24} md={12} lg={8} xl={8}>
                        <Divider orientation="left">Configuración general</Divider>
                        <SettingForm/>
                    </Col>
                    <Col xs={24} md={12} lg={8} xl={8}>
                        <Divider orientation="left">Logo</Divider>
                        <UploadLogo/>
                    </Col>
                </Row>
            </Card>
        )
    }
}

const mapStateToProps = ({global}) => {
    return {
        global,
    }
}

export default connect(mapStateToProps)(Setting);