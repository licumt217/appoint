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