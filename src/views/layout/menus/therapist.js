import React, {Component} from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

import {
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;

class TherapistMenu extends Component {

    handleClick = e => {
        let key = e.key;

        switch (key) {
            case 'therapist-revenue':
                this.props.history.push('/therapist/revenue')
                break;

            case 'therapist-order':
                this.props.history.push('/therapist/orderList')
                break;

            case 'therapist-waitlist':
                this.props.history.push('/therapist/list')
                break;
            case 'therapist-occupy':
                this.props.history.push('/therapist/occupy')
                break;
            case 'therapist-complaint':
                this.props.history.push('/therapist/complaint')
                break;
            case 'setting-appointset':
                this.props.history.push('/therapist/appointSet')
                break;
            case 'setting-feeset':
                this.props.history.push('/therapist/feeset')
                break;
            case 'therapist-periodSet':
                this.props.history.push('/therapist/periodSet')
                break;
            case 'therapist-fax':
                this.props.history.push('/therapist/list')
                break;
            case 'therapist-continueEdu':
                this.props.history.push('/therapist/continueEdu')
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

                <Menu.Item key="therapist-revenue"
                           icon={<MenuUnfoldOutlined/>}>
                    我的收益
                </Menu.Item>

                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="therapist-my"
                    title={<span>我的来访</span>}
                >
                    <Menu.Item key="therapist-order" icon={<MenuUnfoldOutlined/>}>
                        咨询客观记录
                    </Menu.Item>
                    <Menu.Item key="therapist-waitlist"
                               icon={<MenuUnfoldOutlined/>}>
                        等待名单
                    </Menu.Item>
                    <Menu.Item key="therapist-occupy"
                               icon={<MenuUnfoldOutlined/>}>
                        时间使用率
                    </Menu.Item>
                    <Menu.Item key="therapist-complaint"
                               icon={<MenuUnfoldOutlined/>}>
                        投诉用户列表
                    </Menu.Item>

                </SubMenu>

                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="setting"
                    title={<span>设置</span>}
                >

                    <Menu.Item key="setting-appointset"
                               icon={<MenuUnfoldOutlined/>}>
                        预约设置
                    </Menu.Item>
                    <Menu.Item key="therapist-continueEdu"
                               icon={<MenuUnfoldOutlined/>}>
                        继续教育
                    </Menu.Item>
                    <Menu.Item key="setting-feeset"
                               icon={<MenuUnfoldOutlined/>}>
                        收费设置
                    </Menu.Item>
                    <Menu.Item key="therapist-periodSet"
                               icon={<MenuUnfoldOutlined/>}>
                        时段设置
                    </Menu.Item>
                    <Menu.Item key="therapist-fax"
                               icon={<MenuUnfoldOutlined/>}>
                        设定报税
                    </Menu.Item>
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

export default TherapistMenu;