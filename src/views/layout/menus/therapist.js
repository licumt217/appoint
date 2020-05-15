import React, {Component} from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

import {
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;

class TherapistMenu extends Component {
    render() {
        return (
            <Menu theme="dark" mode="inline">

                <Menu.Item key="therapist-revenue"
                           icon={<MenuUnfoldOutlined/>}>
                    <Link to={`/therapist/revenue`}
                          style={{color: 'inherit'}}>我的收益</Link>
                </Menu.Item>

                <SubMenu
                    icon={<MenuUnfoldOutlined/>}
                    key="therapist-my"
                    title={<span>我的来访</span>}
                >
                    <Menu.Item key="appoint-order" icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/appoint/list`}
                              style={{color: 'inherit'}}>咨询客观记录</Link>
                    </Menu.Item>
                    <Menu.Item key="therapist-waitlist"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/therapist/list`}
                              style={{color: 'inherit'}}>等待名单</Link>
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
                    <Menu.Item key="setting-appointset"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/therapist/appointSet`}
                              style={{color: 'inherit'}}>预约设置</Link>
                    </Menu.Item>
                    <Menu.Item key="setting-feeset"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/therapist/feeset`}
                              style={{color: 'inherit'}}>收费设置</Link>
                    </Menu.Item>
                    <Menu.Item key="therapist-periodSet"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/therapist/periodSet`}
                              style={{color: 'inherit'}}>时段设置</Link>
                    </Menu.Item>
                    <Menu.Item key="therapist-fax"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/therapist/list`}
                              style={{color: 'inherit'}}>设定报税</Link>
                    </Menu.Item>
                    <Menu.Item key="therapist-baseinfo"
                               icon={<MenuUnfoldOutlined/>}>
                        <Link to={`/therapist/list`}
                              style={{color: 'inherit'}}>修改密码</Link>
                    </Menu.Item>

                </SubMenu>


            </Menu>
        );
    }
}

export default TherapistMenu;