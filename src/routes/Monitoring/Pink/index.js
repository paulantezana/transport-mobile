import React, { Fragment } from 'react';
import styles from './index.scss';
import { service } from 'config/app';

const ws = new WebSocket(service.socket_location);

ws.onopen = ()=>{
    console.log("conectado");
}

ws.onerror = ()=>{
    console.log("error");
}

setInterval(()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position=>{
            const msg = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
            ws.send(JSON.stringify(msg))
        });
    }else{
        console.log("error");
    }
},1000);

class Pink extends React.Component{
    
    render(){
        return (
            <Fragment>
                <div className={styles.buttom}>
                </div>
            </Fragment>
        )
    }
}
export default Pink;