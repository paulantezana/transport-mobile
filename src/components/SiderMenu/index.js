import 'rc-drawer/assets/index.css';
import React from "react";
import DrawerMenu from 'rc-drawer';
import SiderMenu from './SiderMenu';

const SiderMenuWrapper = props => {
    const { isMobile, collapsed, onCollapse } = props;
    return isMobile ? (
        <DrawerMenu
            handler={false}
            level={null}
            getContainer={null}
            open={!collapsed}
            onMaskClick={()=>{
                onCollapse(true)
            }}>
            <SiderMenu {...props} collapsed={isMobile ? false : collapsed} />
        </DrawerMenu>
    ) : (
        <SiderMenu {...props} />
    );
};

export default SiderMenuWrapper;