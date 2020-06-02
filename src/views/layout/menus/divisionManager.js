import React, {Component} from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

import {
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;

class DivisionManagerMenu extends Component {
    render() {
        return (
            <Menu theme="dark" mode="inline">
                <Menu.Item key="station-list" icon={<MenuUnfoldOutlined/>}>
                    <Link to={`/station/list`}
                          style={{color: 'inherit'}}>工作室管理</Link>
                </Menu.Item>
                <Menu.Item key="therapist-revenue" icon={<MenuUnfoldOutlined/>}>
                    <Link to={`/therapist/revenue`}
                          style={{color: 'inherit'}}>咨询师收益查看</Link>
                </Menu.Item>
                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="preCheck"
                    title={<span>预检表</span>}
                >
                    <Menu.Item key="preCheck-list" icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/preCheck/list`}
                              style={{color: 'inherit'}}>预检表管理</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="setting"
                    title={<span>设置</span>}
                >
                    <Menu.Item key="setting-center"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/user/center`}
                              style={{color: 'inherit'}}>个人中心</Link>
                    </Menu.Item>
                    <Menu.Item key="setting-passModify"
                               icon={<MenuUnfoldOutlined/>}><Link to={`/user/modifypass`}
                                                                  style={{color: 'inherit'}}>修改密码</Link></Menu.Item>
                </SubMenu>


            </Menu>
        );
    }
}

export default DivisionManagerMenu;