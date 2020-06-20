import React, {Component} from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

import {
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;

class Admin extends Component {

    handleClick = e => {
        let key = e.key;

        switch (key) {
            case 'division':
                this.props.history.push('/division/list')
                break;
            case 'ethicsNotice':
                this.props.history.push('/ethicsNotice/list')
                break;
            case 'blacklist':
                this.props.history.push('/blacklist/list')
                break;

            case 'complain-user':
                this.props.history.push('/complain/userList')
                break;
            case 'complain-therapist':
                this.props.history.push('/complain/therapistList')
                break;
            case 'blacklist':
                this.props.history.push('/blacklist/list')
                break;
        }


    };

    render() {
        return (
            <Menu theme="dark" mode="inline" onClick={this.handleClick}>
                <Menu.Item key="division" icon={<MenuUnfoldOutlined/>}>
                    分部管理
                </Menu.Item>
                <Menu.Item key="ethicsNotice" icon={<MenuUnfoldOutlined/>}>
                    伦理公告
                </Menu.Item>
                <Menu.Item key="blacklist" icon={<MenuUnfoldOutlined/>}>
                    黑名单管理
                </Menu.Item>
                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="complain"
                    title={<span>投诉管理</span>}
                >
                    <Menu.Item key="complain-user" icon={<MenuUnfoldOutlined/>}>
                        用户投诉
                    </Menu.Item>
                    <Menu.Item key="complain-therapist" icon={<MenuUnfoldOutlined/>}>
                        咨询师投诉
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
                              style={{color: 'inherit'}}>咨询师等级</Link>
                    </Menu.Item>
                    <Menu.Item key="base-manner"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/base/mannerType`}
                              style={{color: 'inherit'}}>咨询方式</Link>
                    </Menu.Item>
                    <Menu.Item key="base-qualification"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/base/qualificationType`}
                              style={{color: 'inherit'}}>资历类型</Link>
                    </Menu.Item>
                    <Menu.Item key="base-school"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/base/schoolType`}
                              style={{color: 'inherit'}}>咨询师流派</Link>
                    </Menu.Item>
                    <Menu.Item key="base-consult"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/base/consultType`}
                              style={{color: 'inherit'}}>预约类型</Link>
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
                               icon={<MenuUnfoldOutlined/>}><Link to={`/user/modifypass`}
                                                                  style={{color: 'inherit'}}>修改密码</Link></Menu.Item>
                </SubMenu>


            </Menu>
        );
    }
}

export default Admin;