import React, { Component } from 'react';
import styles from './index.scss';
class Preload extends Component{
    render(){
        const { logo } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.logocontainer}>
                    <img src={logo} className={styles.logo}/>
                </div>
            </div>
        )
    }
}


export default Preload;