import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message, Divider, DatePicker, Card} from "antd";
import {register} from "../../../http/service";
import Util from "../../../assets/js/Util";
import moment from 'moment'
import './index.less'

const {Option} = Select;

class Index extends Component {

    constructor(props) {
        super(props);


        this.state = {
            formItem: {}
        }

    }


    back = () => {
        this.props.history.push('/user/login')
    }
    operate = (form) => {

        form.birthday = moment(form.birthday).format('yyyy-MM-DD');

        this.setState({
            formItem: Object.assign(this.state.formItem, form)
        })


        if (!Util.isValidPhone(this.state.formItem.phone)) {
            Util.warning("请输入合法的手机号！")
            return;
        }

        if (!Util.isValidEmail(this.state.formItem.email)) {
            Util.warning("请输入合法的电子邮箱！")
            return;
        }

        if (!Util.isValidID(this.state.formItem.identification_no)) {
            Util.warning("请输入合法的身份证号！")
            return;
        }

        register(this.state.formItem).then((data) => {
            Util.success("注册成功！")

            this.back()

        }).catch(err => {
            Util.error(err)
        })


    }

    render() {


        return (
            <div>
                <Row align={'middle'} className='login_wraper'>
                    <Col span={8} offset={8}>
                        <Card title="咨询师注册">
                            <Form
                                layout="horizontal"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 20}}
                                initialValues={this.state.formItem}
                                onFinish={this.operate}
                            >
                                <Form.Item
                                    label="手机号"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: '手机号不能为空!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={'请输入手机号'} maxLength={11}/>
                                </Form.Item>

                                <Form.Item
                                    label="身份证号"
                                    name="identification_no"
                                    rules={[
                                        {
                                            required: true,
                                            message: '身份证号不能为空!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={'请输入身份证号'} maxLength={21}/>
                                </Form.Item>

                                <Form.Item
                                    label="密码"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码不能为空!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder={'请输入密码'} maxLength={20}/>
                                </Form.Item>

                                <Form.Item
                                    label="姓名"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: '姓名不能为空!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={'请输入姓名'} maxLength={20}/>
                                </Form.Item>


                                <Form.Item name="gender" label="性别"
                                           rules={[{required: true, message: '性别不能为空!'}]}>
                                    <Select
                                        placeholder="请选择性别"
                                        value={this.state.formItem.gender}
                                    >
                                        <Option key={1} value='male'>男</Option>
                                        <Option key={2} value='female'>女</Option>

                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="电子邮箱"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: '电子邮箱不能为空!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={'请输入电子邮箱'} maxLength={50}/>
                                </Form.Item>

                                <Form.Item
                                    label="出生日期"
                                    name="birthday"
                                    format="YYYY-MM-DD"
                                    rules={[
                                        {
                                            required: true,
                                            message: '出生日期不能为空!',
                                        },
                                    ]}
                                >
                                    <DatePicker/>
                                </Form.Item>


                                <Form.Item wrapperCol={{offset: 8, span: 16}}>


                                    <Space>
                                        <Button style={{width: '6em'}} type="default" onClick={this.back}>
                                            返回登录
                                        </Button>
                                        <Button style={{width: '6em'}} type="primary" htmlType="submit">
                                            注册
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;