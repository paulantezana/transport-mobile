import React from 'react';
import Maps from './Maps';
import { Row, Col } from 'antd';
import Pink from './Pink';
import Clock from './Clock';

class Monitoring extends React.Component{
    render(){
        return (
            <div>
                <Row>
                    <Col span={8}><Clock/></Col>
                    <Col span={8}><Pink/></Col>
                    <Col span={8}>20 Minutos</Col>
                </Row>
                <Maps/>
            </div>
        )
    }
}
export default Monitoring;