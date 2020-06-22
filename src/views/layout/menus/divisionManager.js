import React, {Component} from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

import {
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;

class DivisionManagerMenu extends Component {

    handleClick = e => {
        let key = e.key;

        switch (key) {
            case 'station-list':
                this.props.history.push('/station/list')
                break;

            case 'therapist-revenue':
                this.props.history.push('/therapist/revenue')
                break;

            case 'preCheck-list':
                this.props.history.push('/preCheck/list')
                break;

            case 'setting-center':
                this.props.history.push('/user/center')
                break;
            case 'setting-passModify':
                this.props.history.push('/user/modifypass')
                break;
        }


    };

    render() {
        return (
            <Menu theme="dark" mode="inline" onClick={this.handleClick}>
                <Menu.Item key="station-list" icon={<MenuUnfoldOutlined/>}>
                    工作室管理
                </Menu.Item>
                <Menu.Item key="therapist-revenue" icon={<MenuUnfoldOutlined/>}>
                    咨询师收益查看
                </Menu.Item>
                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="preCheck"
                    title={<span>预检表</span>}
                >
                    <Menu.Item key="preCheck-list" icon={<MenuUnfoldOutlined/>}>
                        预检表管理
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="setting"
                    title={<span>设置</span>}
                >
                    <Menu.Item key="setting-center"
                               icon={<MenuUnfoldOutlined/>}>
                        个人中心
                    </Menu.Item>
                    <Menu.Item key="setting-passModify"
                               icon={<MenuUnfoldOutlined/>}>
                        修改密码
                    </Menu.Item>
                </SubMenu>


            </Menu>
        );
    }
}

export default DivisionManagerMenu;