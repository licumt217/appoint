import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message, Divider, DatePicker} from "antd";
import {addDivisionAdmin, updateDivisionAdmin} from "../../../http/service";
import Util from "../../../assets/js/Util";
import Role from "../../../assets/js/Role";
import {NOTICE_SHOW_TYPE} from "../../../assets/js/constants/constant";
import {getUserList} from "../../../http/service";
import {EthicsNotice} from "../EthicsNotice";
import moment from 'moment'
import {Therapist} from "../Therapist";

const {Option} = Select;

class Index extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.isEdit = this.props.location.state && this.props.location.state.opType === 'edit'

        let formItem = {
            showManner: 1
        }
        if (this.isEdit) {
            formItem = this.props.location.state.formItem
            formItem.endDate = moment(formItem.endDate)
        }


        this.state = {
            formItem,
            therapistList: []
        }

    }

    componentDidMount() {
        this.getTherapistList()
    }


    getTherapistList = () => {
        getUserList({
            role: Role.therapist
        }).then(data => {

            this.setState({
                therapistList: data.data
            })
        })
    }


    back = () => {
        this.props.history.push('/ethicsNotice/list')
    }
    operate = (form) => {

        form.endDate = moment(form.birthday).format('yyyy-MM-DD');

        this.setState({
            formItem: Object.assign(this.state.formItem, form)
        })


        if (this.isEdit) {
            Util.success("修改成功！")

            this.props.history.push({
                pathname: '/ethicsNotice/list',
                state: {}
            })
        } else {
            Util.success("添加成功！")

            this.props.history.push({
                pathname: '/ethicsNotice/list',
                state: {}
            })
        }


    }

    render() {


        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>伦理公告操作</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col offset={8} span={8}>

                        <Form
                            ref={this.formRef}
                            layout="horizontal"
                            labelCol={{span: 4}}
                            wrapperCol={{span: 20}}
                            initialValues={this.state.formItem}
                            onFinish={this.operate}
                        >
                            <Form.Item name="therapistId" label="咨询师"
                                       rules={[{required: true, message: '咨询师不能为空!'}]}>
                                <Select
                                    placeholder="请选择咨询师"
                                >

                                    {
                                        this.state.therapistList.map((item, index) => {
                                            return <Option key={index} value={item.user_id}>{item.name}</Option>
                                        })
                                    }

                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="公告内容"
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message: '公告内容不能为空!',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={5} placeholder={'请输入公告内容'} maxLength={500}/>
                            </Form.Item>

                            <Form.Item name="showManner" label="显示方式"
                                       rules={[{required: true, message: '显示方式不能为空!'}]}>
                                <Select
                                    placeholder="请选择显示方式"
                                >
                                    <Option value={0}>不显示</Option>
                                    <Option value={1}>永久显示</Option>
                                    <Option value={2}>一段时间显示</Option>

                                </Select>
                            </Form.Item>
                            <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) => prevValues.showManner !== currentValues.showManner}
                            >

                                {({getFieldValue}) => {
                                    return getFieldValue('showManner') === 2 ? (
                                        <Form.Item
                                            label="截止日期"
                                            name="endDate"
                                            format="YYYY-MM-DD"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '截止日期不能为空!',
                                                },
                                            ]}
                                        >
                                            <DatePicker/>
                                        </Form.Item>
                                    ) : null
                                }}

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