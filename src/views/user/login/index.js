import React, {Component} from 'react';

import {Form, Input, Button, Modal, Row, Col, Card, message} from 'antd';

import Util from "../../../assets/js/Util";

import {login,forgetPassword} from "../../../http/service";

import Role from "../../../assets/js/Role";

import store from "../../../store";

import './index.less'


class Index extends Component {

    constructor(props) {
        super(props);
        this.state={
            isShowForgetModal:false,
            phone:''
        }
    }

    register=()=>{
        this.props.history.push('/user/register');
    }


    goAfterLogin = () => {
        const role = store.getState().role;

        switch (role) {
            case Role.admin:
                this.props.history.push('/division/list');
                break;
            case Role.divisionManager:
                this.props.history.push('/station/list');
                break;
            case Role.caseManager:
                this.props.history.push('/room/list');
                break;
            case Role.therapist:
                this.props.history.push('/appoint/list');
                break;
        }

    }
    login = (form) => {


        if (!Util.isValidPhone(form.phone)) {
            message.warning('手机号格式不正确！')
        } else {
            login(form).then((data) => {

                let userInfo = data.userInfo;
                let token = data.token;

                let user_id = userInfo.user_id;
                let user_name = userInfo.name;
                let role = userInfo.role;

                if (role === Role.client) {
                    message.error('无权限！！！')
                } else {
                    sessionStorage.token = data.token;
                    sessionStorage.user_id = user_id
                    sessionStorage.role = role

                    let batchArray=[{
                        type: 'login',
                        payload: true
                    }, {
                        type: 'user_id',
                        payload: user_id
                    }, {
                        type: 'user_name',
                        payload: user_name
                    }, {
                        type: 'role',
                        payload: role
                    }, {
                        type: 'token',
                        payload: token
                    }]

                    if(role===Role.caseManager){
                        batchArray.push({
                            type: 'station_id',
                            payload: userInfo.station_id
                        })
                        batchArray.push({
                            type: 'station_name',
                            payload: userInfo.station_name
                        })
                    }
                    store.batchDispatch(batchArray)

                    message.success("登录成功")

                    this.goAfterLogin()
                }


            }).catch(err => {
                message.error(err)
            })
        }


    }

    forgetPassword=()=>{
        let phone=this.state.phone;
        if(phone && Util.isValidPhone(phone)){

            forgetPassword( {
                phone
            }).then((data) => {

                this.setState({
                    isShowForgetModal:false
                })

                message.success(`新的随机密码已发送至手机号${phone}对应的邮箱${data.email}，请注意查收！`)

            }).catch(err => {
                message.error(err)
            })

        }else{
            message.warning(`请填写正确的手机号！`)
        }
    }

    render() {

        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };

        return (
            <section>
                <Modal
                    title="密码找回"
                    okText="确定"
                    cancelText="取消"
                    visible={this.state.isShowForgetModal}
                    onOk={this.forgetPassword}
                    onCancel={()=>{
                        this.setState({
                            isShowForgetModal:false
                        })
                    }}
                >
                    <Form>
                        <Form.Item
                            label="手机号"
                        >
                            <Input maxLength={11} value={this.state.phone} placeholder='请输入手机号' onChange={(e)=>{
                                this.setState({
                                    phone:e.target.value
                                })
                            }}/>
                        </Form.Item>


                    </Form>
                </Modal>

                <Row align={'middle'} className='login_wraper'>
                    <Col span={6} offset={9}>
                        <Card title="预约管理系统">
                            <Form
                                {...layout}
                                name="basic"
                                onFinish={this.login}
                            >
                                <Form.Item
                                    label="手机号"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入手机号！',
                                        },
                                    ]}
                                >
                                    <Input maxLength={11}/>
                                </Form.Item>

                                <Form.Item
                                    label="密码"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码！',
                                        },
                                    ]}
                                >
                                    <Input.Password maxLength={30}/>
                                </Form.Item>

                                <div className='forget-password' onClick={()=>{
                                    this.setState({
                                        isShowForgetModal:true
                                    })
                                }}>忘记密码？</div>

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        登录
                                    </Button>
                                    <Button type="default" className='register-btn' onClick={this.register}>
                                        注册
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>


                    </Col>
                </Row>
            </section>

        );
    }
}

export default Index

