import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message, Divider, DatePicker, Card} from "antd";
import {updateUser, addCasemanager} from "../../../http/service";
import Util from "../../../assets/js/Util";
import moment from 'moment'
import Role from "../../../assets/js/Role";
import './index.less'
const {Option} = Select;

class Index extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.isEdit = this.props.location.state && this.props.location.state.opType === 'edit'
        this.station_id = this.props.location.state.station_id


        this.state = {
            formItem: this.isEdit?this.props.location.state.formItem:{}
        }

    }

    componentDidMount() {
        if(this.isEdit){
            let formItem=this.state.formItem;
            formItem.birthday=moment(formItem.birthday)
            this.formRef.current.setFieldsValue(formItem)
        }
    }

    back=()=>{
        this.props.history.goBack();
    }




    operate = (form) => {

        form.birthday = Util.getDateFromMoment(form.birthday)

        this.setState({
            formItem: Object.assign({
                role:Role.caseManager,
                station_id:this.station_id
            },this.state.formItem, form)
        })


        if (!Util.isValidPhone(this.state.formItem.phone)) {
            Util.warning("请输入合法的手机号！")
            return;
        }

        if (!Util.isValidEmail(this.state.formItem.email)) {
            Util.warning("请输入合法的电子邮箱！")
            return;
        }


        if(this.isEdit){
            updateUser(this.state.formItem).then((data) => {
                Util.success("操作成功！")

                this.back()

            }).catch(err => {
                Util.error(err)
            })
        }else{
            addCasemanager(this.state.formItem).then((data) => {
                Util.success("操作成功！")

                this.back()

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
                        <h3>案例管理员操作</h3>
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
                                <Input key={1} placeholder={'请输入手机号'} maxLength={11}/>
                            </Form.Item>

                            <Form.Item name="gender" label="性别"
                                       rules={[{required: true, message: '性别不能为空!'}]}>
                                <Select
                                    placeholder="请选择性别"
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
                                    <Button style={{width: '6em'}} type="default" onClick={this.back} >
                                        返回
                                    </Button>
                                    <Button style={{width: '6em'}} type="primary" htmlType="submit">
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