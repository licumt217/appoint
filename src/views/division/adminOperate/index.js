import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message, Divider, DatePicker} from "antd";
import {addDivisionAdmin, updateDivisionAdmin} from "../../../http/service";
import Util from "../../../assets/js/Util";
import Role from "../../../assets/js/Role";
import moment from 'moment'

const {Option} = Select;

class Index extends Component {

    constructor(props) {
        super(props);

        this.isEdit = this.props.location.state && this.props.location.state.opType === 'edit'
        this.division_id = (this.props.location.state && this.props.location.state.division_id) ? this.props.location.state.division_id : ''

        let formItem={}
        if(this.isEdit){
            formItem=this.props.location.state.formItem
            formItem.birthday=moment(formItem.birthday)
        }

        
        this.state = {
            formItem
        }

    }


    back = () => {
        this.props.history.goBack()
    }
    operate = (form) => {

        form.birthday=moment(form.birthday).format('yyyy-MM-DD');
        form.division_id=this.division_id;

        this.setState({
            formItem:Object.assign(this.state.formItem,form)
        })

        if (!Util.isValidPhone(this.state.formItem.phone)) {
            Util.warning('请输入合法的手机号！')
            return;
        }

        if (!Util.isValidEmail(this.state.formItem.email)) {
            Util.warning('请输入合法的电子邮箱！')
            return;
        }

        if (this.isEdit) {
            updateDivisionAdmin(this.state.formItem).then((data) => {

                Util.success("修改成功！")

                this.props.history.push({
                    pathname: '/division/adminList',
                    state: {
                        division_id: this.division_id
                    }
                })


            }).catch(err => {
                Util.error(err)
            })
        } else {
            addDivisionAdmin(this.state.formItem).then((data) => {

                Util.success("新增成功！")

                this.props.history.push({
                    pathname: '/division/adminList',
                    state: {
                        division_id: this.division_id
                    }
                })


            }).catch(err => {
                Util.error(err)
            })
        }


    }

    render() {




        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>分部管理员操作</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col offset={8} span={8}>

                        <Form
                            layout="horizontal"
                            labelCol={{span:4}}
                            wrapperCol={{ span: 20 }}
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
                                    <Button type="default" onClick={this.back}>
                                        返回
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        确定
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;