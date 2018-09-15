import React, { Fragment } from 'react';
import styles from './index.scss';
import { service } from 'config/app';
import { connect } from 'dva';

class Pink extends React.Component{
    constructor(props){
        super(props);
        this.handleSendPosition = this.handleSendPosition.bind(this);
    }

    componentDidMount(){
        this.handleSendPosition();
    }

    handleSendPosition(){
        const ws = new WebSocket(service.socket_location);
        ws.onopen = ()=>{
            console.log("conectado");
        }
        ws.onerror = ()=>{
            console.log("error");
        }
        setInterval(()=>{
            if (navigator.geolocation && this.props.global.success) {
                navigator.geolocation.getCurrentPosition(position=>{
                    const msg = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        name: this.props.global.mobile.name,
                    }
                    ws.send(JSON.stringify(msg))
                });
            }else {
                console.log("error");
            }
        }, 1000);
    }
    
    render(){
        return (
            <Fragment>
                <div className={styles.buttom}/>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ global }) => {
    return { global }
}

export default connect(mapStateToProps)(Pink);