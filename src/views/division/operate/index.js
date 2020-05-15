import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message,Divider} from "antd";
import {addDivision, updateDivision} from "../../../http/service";

const {Option} = Select;

class Index extends Component {

    constructor(props) {
        super(props);

        this.isEdit = this.props.location.state && this.props.location.state.opType === 'edit'


        this.state = {
            formItem: this.isEdit?this.props.location.state.formItem:{}
        }
    }


    back = () => {
        this.props.history.push('/division/list')
    }

    operate = (values) => {

        this.setState({
            formItem: Object.assign(this.state.formItem,values)
        })

        if (this.isEdit) {

            updateDivision(this.state.formItem).then((data) => {

                message.success("修改成功！")
                this.back()


            }).catch(err => {
                message.error(err)
            })
        } else {

            addDivision(this.state.formItem).then((data) => {

                message.success("新增成功！")
                this.back()

            }).catch(err => {
                message.error(err)
            })
        }


    }

    render() {

        this.function_level_list = [{
            id: 0,
            name: '基础功能'
        }, {
            id: 1,
            name: '预约管理'
        }, {
            id: 2,
            name: '账单生成'
        }, {
            id: 3,
            name: '线上支付'
        }]


        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>分部操作</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col offset={8} span={8}>

                        <Form
                            name="basic"
                            initialValues={this.state.formItem}
                            onFinish={this.operate}
                        >
                            <Form.Item
                                label="分部名称"
                                name="division_name"
                                rules={[
                                    {
                                        required: true,
                                        message: '分部名称不能为空!',
                                    },
                                ]}
                            >
                                <Input placeholder={'请输入分部名称'}/>
                            </Form.Item>

                            <Form.Item name="function_level" label="功能等级"
                                       rules={[{required: true, message: '功能等级不能为空!'}]}>
                                <Select
                                    placeholder="请选择功能等级"
                                    value={this.state.formItem.function_level}
                                >
                                    {
                                        this.function_level_list.map((item, index) => {
                                            return <Option key={index} value={item.id}>{item.name}</Option>
                                        })
                                    }

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