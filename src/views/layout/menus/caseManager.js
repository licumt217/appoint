import React, {Component} from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

import {
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;

class CaseManagerMenu extends Component {

    handleClick = e => {
        let key = e.key;

        switch (key) {
            case 'room':
                this.props.history.push('/room/list')
                break;

            case 'station-relateTherapist':
                this.props.history.push('/station/relateTherapist')
                break;

            case 'therapist-revenue':
                this.props.history.push('/therapist/revenue')
                break;

            case 'complain-user':
                this.props.history.push('/complain/userList')
                break;
            case 'complain-therapist':
                this.props.history.push('/complain/therapistList')
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

                <Menu.Item key="room" icon={<MenuUnfoldOutlined/>}>
                    房间管理
                </Menu.Item>

                <Menu.Item key="station-relateTherapist" icon={<MenuUnfoldOutlined/>}>
                    咨询师管理
                </Menu.Item>
                <Menu.Item key="therapist-revenue" icon={<MenuUnfoldOutlined/>}>
                    咨询师收益查看
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
                    key="setting"
                    title={<span>设置</span>}
                >
                    <Menu.Item key="setting-center" icon={<MenuUnfoldOutlined/>}>
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

export default CaseManagerMenu;
