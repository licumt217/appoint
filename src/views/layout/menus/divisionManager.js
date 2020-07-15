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
            case 'refund-list':
                this.props.history.push('/refund/list')
                break;

            case 'preCheck-list':
                this.props.history.push('/preCheck/list')
                break;
            case 'continueEdu-queryList':
                this.props.history.push('/therapist/continueEdu/queryList')
                break;



            case 'setting-center':
                this.props.history.push('/user/center')
                break;
            case 'setting-passModify':
                this.props.history.push('/user/modifypass')
                break;

            case 'measure-list':
                this.props.history.push('/measure/list')
                break;
            case 'complain-user':
                this.props.history.push('/complain/userList')
                break;
            case 'complain-therapist':
                this.props.history.push('/complain/therapistList')
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
                <Menu.Item key="refund-list" icon={<MenuUnfoldOutlined/>}>
                    退款管理
                </Menu.Item>
                <Menu.Item key="measure-list" icon={<MenuUnfoldOutlined/>}>
                    预检表管理
                </Menu.Item>
                <Menu.Item key="continueEdu-queryList" icon={<MenuUnfoldOutlined/>}>
                    继续教育
                </Menu.Item>

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
