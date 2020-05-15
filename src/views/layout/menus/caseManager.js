import React, {Component} from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

import {
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;

class CaseManagerMenu extends Component {
    render() {
        return (
            <Menu theme="dark" mode="inline">

                <Menu.Item key="room" icon={<MenuUnfoldOutlined/>}>
                    <Link to={`/room/list`}
                          style={{color: 'inherit'}}>房间管理</Link>
                </Menu.Item>

                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="setting"
                    title={<span>设置</span>}
                >
                    <Menu.Item key="setting-center" icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/user/center`}
                              style={{color: 'inherit'}}>个人中心</Link>
                    </Menu.Item>
                    <Menu.Item key="therapist2-baseinfo" icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/therapist/list`}
                              style={{color: 'inherit'}}>修改密码</Link>
                    </Menu.Item>

                </SubMenu>


            </Menu>
        );
    }
}

export default CaseManagerMenu;