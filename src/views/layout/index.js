import React from "react";

import {Layout, Menu, Row, Col, Dropdown} from 'antd';

import {withRouter} from "react-router-dom";

import './index.less'

import store from "../../store";

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
} from '@ant-design/icons';
import Role from "../../assets/js/Role";
import AdminMenu from './menus/admin'
import CaseManagerMenu from './menus/caseManager'
import DivisionManagerMenu from './menus/divisionManager'
import TherapistMenu from './menus/therapist'

const {Header, Sider, Content} = Layout;

class The_Layout extends React.Component {

    constructor(props) {
        super(props);


    }

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    logout = () => {
        store.clear()
        this.props.history.push('/user/login')
    }

    render() {

        const logoutMenu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.logout}>
                        退出登录
                    </a>
                </Menu.Item>
            </Menu>
        );

        let Current_Menu = <div></div>;

        switch (store.getState().role) {
            case Role.admin:
                Current_Menu = <AdminMenu/>
                break;
            case Role.divisionManager:
                Current_Menu = <DivisionManagerMenu/>
                break;
            case Role.caseManager:
                Current_Menu = <CaseManagerMenu/>
                break;
            case Role.therapist:
                Current_Menu = <TherapistMenu/>
                break;
        }


        return (
            <React.Fragment>
                {
                    store.getState().login ?
                        (
                            <Layout>
                                <Sider trigger={null} collapsible collapsed={this.state.collapsed}
                                       className='mySideBar'>
                                    <div className="logo"/>

                                    {Current_Menu}

                                </Sider>
                                <Layout className="site-layout">
                                    <Header className="site-layout-background" style={{padding: 0}}>

                                        <Row>
                                            <Col span={21}>
                                                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                                    className: 'trigger',
                                                    onClick: this.toggle,
                                                })}
                                            </Col>
                                            <Col span={3}>
                                                <Dropdown overlay={logoutMenu}>
                                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                        {store.getState().user_name} <DownOutlined/>
                                                    </a>
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                    </Header>
                                    <Content
                                        className="site-layout-background global-content"
                                    >
                                        {this.props.children}
                                    </Content>
                                </Layout>
                            </Layout>
                        )
                        :
                        (
                            this.props.children
                        )
                }

            </React.Fragment>
        );
    }
}

export default withRouter(The_Layout)