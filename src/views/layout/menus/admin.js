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


            case 'measure-list':
                this.props.history.push('/measure/list')
                break;


            case 'base-level':
                this.props.history.push('/base/levelType')
                break;
            case 'base-manner':
                this.props.history.push('/base/mannerType')
                break;
            case 'base-qualification':
                this.props.history.push('/base/qualificationType')
                break;
            case 'base-school':
                this.props.history.push('/base/schoolType')
                break;
            case 'base-consult':
                this.props.history.push('/base/consultType')
                break;
            case 'base-agreement':
                this.props.history.push('/base/agreement')
                break;
            case 'setting-center':
                this.props.history.push('/user/center')
                break;
            case 'setting-passModify':
                this.props.history.push('/user/modifypass')
                break;
            case 'system-continueEdu':
                this.props.history.push('/system/continueEdu')
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
                <Menu.Item key="measure-list" icon={<MenuUnfoldOutlined/>}>
                    预检表管理
                </Menu.Item>
                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="base"
                    title={<span>基础信息</span>}
                >
                    <Menu.Item key="base-level" icon={<MenuUnfoldOutlined/>}>
                        咨询师等级
                    </Menu.Item>
                    <Menu.Item key="base-manner" icon={<MenuUnfoldOutlined/>}>
                        咨询方式
                    </Menu.Item>
                    <Menu.Item key="base-qualification" icon={<MenuUnfoldOutlined/>}>
                        资历类型
                    </Menu.Item>
                    <Menu.Item key="base-school" icon={<MenuUnfoldOutlined/>}>
                        咨询师流派
                    </Menu.Item>
                    <Menu.Item key="base-consult" icon={<MenuUnfoldOutlined/>}>
                        预约类型
                    </Menu.Item>
                    <Menu.Item key="base-agreement" icon={<MenuUnfoldOutlined/>}>
                        用户协议
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="system"
                    title={<span>系统设置</span>}
                >
                    <Menu.Item key="system-continueEdu"
                               icon={<MenuUnfoldOutlined/>}>
                        继续教育
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="setting"
                    title={<span>设置</span>}
                >
                    <Menu.Item key="setting-center" icon={<MenuUnfoldOutlined/>}>
                        个人中心
                    </Menu.Item>
                    <Menu.Item key="setting-passModify" icon={<MenuUnfoldOutlined/>}>
                        修改密码
                    </Menu.Item>
                </SubMenu>


            </Menu>
        );
    }
}

export default Admin;
