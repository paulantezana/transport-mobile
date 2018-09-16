import React from 'react';
import Maps from './Maps';
import { Row, Col } from 'antd';
import Pink from './Pink';
import Clock from './Clock';

import styles from './index.scss';

class Monitoring extends React.Component{
    render(){
        return (
            <div className={styles.container}>
                <Row className={styles.header}>
                    <Col span={5}><Pink/></Col>
                    <Col span={16}>
                        <Clock/>
                        <div className={styles.pikerTime}>20 M</div>
                    </Col>
                </Row>
                <Maps/>
            </div>
        )
    }
}

export default Monitoring;