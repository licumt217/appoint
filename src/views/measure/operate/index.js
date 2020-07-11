import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message, Divider} from "antd";
import {addMeasure, updateMeasure} from "../../../http/service";

const {Option} = Select;
const {TextArea} = Input;

import Util from "../../../assets/js/Util";

class Index extends Component {

    constructor(props) {
        super(props);

        this.isEdit = this.props.location.state && this.props.location.state.opType === 'edit'
        this.from = (this.props.location.state && this.props.location.state.from ) ?this.props.location.state.from: '/measure/list'

        let obj=this.isEdit ? this.props.location.state.formItem : {
            chartType:null
        }
        this.state = {
            formItem: obj
        }


    }


    componentDidMount() {

    }


    back = () => {
        this.props.history.push(this.from)
    }

    operate = (values) => {

        this.setState({
            formItem: Object.assign(this.state.formItem, values)
        })

        if (this.isEdit) {

            updateMeasure(this.state.formItem).then((data) => {

                Util.success("修改成功！")
                this.props.history.push('/measure/list')

            }).catch(err => {
                Util.error(err)
            })
        } else {

            addMeasure(this.state.formItem).then((data) => {

                Util.success("新增成功！")
                this.props.history.push('/measure/list')

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
                        <h3>量表操作</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col offset={6} span={10}>

                        <Form
                            name="basic"
                            labelCol={{span: 8}}
                            initialValues={this.state.formItem}
                            onFinish={this.operate}
                        >
                            <Form.Item
                                label="量表名称"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: '量表名称不能为空!',
                                    },
                                ]}
                            >
                                <Input placeholder={'请输入量表名称'}/>
                            </Form.Item>

                            <Form.Item
                                label="量表别名"
                                name="alias"
                                rules={[
                                    {
                                        required: true,
                                        message: '量表别名不能为空!',
                                    },
                                ]}
                            >
                                <Input placeholder={'请输入量表别名'}/>
                            </Form.Item>

                            <Form.Item
                                label="量表描述"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: '量表描述不能为空!',
                                    },
                                ]}
                            >
                                <TextArea rows={3} placeholder={'请输入量表描述'}/>
                            </Form.Item>

                            <Form.Item
                                label="反馈报告描述"
                                name="start_description"
                                rules={[
                                    {
                                        required: true,
                                        message: '反馈报告描述不能为空!',
                                    },
                                ]}
                            >
                                <TextArea rows={3} placeholder={'请输入反馈报告描述'}/>
                            </Form.Item>

                            <Form.Item name="chartType" label="反馈报告图表类型"
                                       >
                                <Select
                                    placeholder="请选择图表类型"
                                    value={this.state.formItem.chartType}
                                >
                                    <Option value={null}>无</Option>
                                    <Option value="line">折线图</Option>
                                    <Option value="bar">柱状图</Option>
                                    <Option value="pie">饼图</Option>
                                </Select>
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
