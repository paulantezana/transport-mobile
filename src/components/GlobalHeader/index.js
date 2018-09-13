import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { Menu, Icon, Spin, Dropdown, Avatar, Divider } from 'antd';
import NoticeIcon from '../NoticeIcon';
import styles from './index.scss';
import { service } from 'config/app';

class GlobalHeader extends PureComponent {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
    };

    render(){
        const {
            currentUser = {},
            collapsed,
            isMobile,
            logo,
            onMenuClick,
            setting,
        } = this.props;

        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item key="profile" >
                    <Icon type="user" className={styles.icon}/>
                    <span>Perfil</span>
                </Menu.Item>
                <Menu.Item key="setting" disabled>
                    <Icon type="setting" className={styles.icon}/>
                    <span>Configuracion</span>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout">
                    <Icon type="logout" className={styles.icon}/>
                    <span>Cerrar Session</span>
                </Menu.Item>
            </Menu>
        )

        const customAvatar = currentUser.avatar == "" ? setting.logo : currentUser.avatar;

        return (
            <header className={styles.header}>
                {isMobile && [
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32" />
                    </Link>,
                    <Divider type="vertical" key="line" />,
                ]}
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}/>
                <div className={styles.right}>
                    
                    <NoticeIcon
                        className={styles.action}
                        count={0}
                        onItemClick={(item, tabProps) => {
                            console.log(item, tabProps); // eslint-disable-line
                        }}
                        >
                        <NoticeIcon.Tab
                            list={()=>{}}
                            title="Notificaciones"
                            emptyText="Empty"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                        />
                    </NoticeIcon>

                    { currentUser.user_name ? (
                        <Dropdown overlay={menu}>
                            <span className={`${styles.action} ${styles.account}`}>
                                <Avatar size="small" className={styles.avatar} src={`${service.path}/${customAvatar}`} />
                                <span className={styles.name}>{currentUser.user_name}</span>
                            </span>
                        </Dropdown>
                    ) : (
                        <Spin size="small" style={{ marginLeft: 8 }} />
                    )}
                </div>
            </header>
        );
    }
}

export default GlobalHeader;