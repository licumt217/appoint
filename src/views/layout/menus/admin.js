import React, {Component} from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

import {
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;

class Admin extends Component {
    render() {
        return (
            <Menu theme="dark" mode="inline">
                <Menu.Item key="division" icon={<MenuUnfoldOutlined/>}>
                    <Link to={`/division/list`}
                          style={{color: 'inherit'}}>分部管理</Link>
                </Menu.Item>
                <Menu.Item key="ethicsNotice" icon={<MenuUnfoldOutlined/>}>
                    <Link to={`/ethicsNotice/list`}
                          style={{color: 'inherit'}}>伦理公告</Link>
                </Menu.Item>
                <Menu.Item key="blackList" icon={<MenuUnfoldOutlined/>}>
                    <Link to={`/blackList/list`}
                          style={{color: 'inherit'}}>黑名单管理</Link>
                </Menu.Item>
                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="complain"
                    title={<span>投诉管理</span>}
                >
                    <Menu.Item key="complain-user"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/complain/userList`}
                              style={{color: 'inherit'}}>用户投诉咨询师管理</Link>
                    </Menu.Item>
                    <Menu.Item key="complain-therapist"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/complain/therapistList`}
                              style={{color: 'inherit'}}>咨询师投诉用户管理</Link>

                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="base"
                    title={<span>基础信息</span>}
                >
                    <Menu.Item key="base-level"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/base/levelType`}
                              style={{color: 'inherit'}}>等级设置</Link>
                    </Menu.Item>
                    <Menu.Item key="base-manner"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/base/mannerType`}
                              style={{color: 'inherit'}}>咨询方式设置</Link>
                    </Menu.Item>
                    <Menu.Item key="base-qualification"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/base/qualificationType`}
                              style={{color: 'inherit'}}>资历类型设置</Link>
                    </Menu.Item>
                    <Menu.Item key="base-school"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/base/schoolType`}
                              style={{color: 'inherit'}}>流派设置</Link>
                    </Menu.Item>
                    <Menu.Item key="base-consult"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/base/consultType`}
                              style={{color: 'inherit'}}>预约类型设置</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="setting"
                    title={<span>设置</span>}
                >
                    <Menu.Item key="setting-center" icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/user/center`}
                              style={{color: 'inherit'}}>个人中心</Link>
                    </Menu.Item>
                    <Menu.Item key="setting-passModify"
                               icon={<MenuUnfoldOutlined/>}>修改密码</Menu.Item>
                </SubMenu>





            </Menu>
        );
    }
}

export default Admin;