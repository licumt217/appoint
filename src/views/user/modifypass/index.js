import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message, Divider, DatePicker, Card, Modal} from "antd";
import { updatePassword} from "../../../http/service";
import Util from "../../../assets/js/Util";
import './index.less'
import store from "../../../store";

class Index extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            visible:true,
            formItem: {}
        }

    }

    componentDidMount() {
    }


    operate = (form) => {

        const {password,newPassword,confirmPassword}=form;

        if(password===newPassword){
            Util.warning("新密码不能和原密码相同！")
            return;
        }

        if(confirmPassword!==newPassword){
            Util.warning("确认新密码和新密码不相同！")
            return;
        }

        this.setState({
            formItem: Object.assign(this.state.formItem, form)
        })

        updatePassword(this.state.formItem).then((data) => {
            Util.success("密码修改成功，请重新登录！")

            store.clear()
            this.props.history.push('/user/login')

        }).catch(err => {
            Util.error(err)
        })


    }

    render() {


        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>密码修改</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={8} offset={8}>
                        <Form
                            ref={this.formRef}
                            layout="horizontal"
                            labelCol={{span: 4}}
                            wrapperCol={{span: 20}}
                            onFinish={this.operate}
                        >
                            <Form.Item name={'password'} label={'原密码'} rules={[
                                {
                                    required: true,
                                    message: '原密码不能为空!',
                                },
                            ]}>
                                <Input type={"password"} placeholder='请输入原始密码' minLength={6} maxLength={50}></Input>
                            </Form.Item>

                            <Form.Item name={'newPassword'} label={'新密码'} rules={[
                                {
                                    required: true,
                                    message: '新密码不能为空!',
                                },
                            ]}>
                                <Input type={"password"} placeholder='请输入原始密码' minLength={6} maxLength={50}></Input>
                            </Form.Item>

                            <Form.Item name={'confirmPassword'} label={'确认新密码'} rules={[
                                {
                                    required: true,
                                    message: '确认新密码不能为空!',
                                },
                            ]}>
                                <Input type={"password"} placeholder='请输入原始密码' minLength={6} maxLength={50}></Input>
                            </Form.Item>

                            <Form.Item wrapperCol={{offset: 8, span: 16}}>


                                <Button style={{width: '6em'}} type="primary" htmlType="submit">
                                    确定
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;