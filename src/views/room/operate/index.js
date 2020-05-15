import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Space, Divider} from "antd";
import {addRoom, updateRoom} from "../../../http/service";
import Util from "../../../assets/js/Util";

class Index extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.isEdit = this.props.location.state && this.props.location.state.opType === 'edit'


        this.state = {
            formItem: this.isEdit ? this.props.location.state.formItem : {}
        }


    }

    componentDidMount() {
        this.formRef.current.setFieldsValue(this.state.formItem)
    }


    back = () => {
        this.props.history.goBack();
    }

    operate = (form) => {

        this.setState({
            formItem: Object.assign(this.state.formItem, form)
        })


        if (this.isEdit) {
            updateRoom(this.state.formItem).then((data) => {
                Util.success("操作成功！")

                this.back()

            }).catch(err => {
                Util.error(err)
            })
        } else {
            addRoom(this.state.formItem).then((data) => {
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
                        <h3>房间操作</h3>
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
                                label="房间名"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: '房间名不能为空!',
                                    },
                                ]}
                            >
                                <Input key={1} placeholder={'请输入房间名'} maxLength={50}/>
                            </Form.Item>

                            <Form.Item
                                label="房间位置"
                                name="position"
                                rules={[
                                    {
                                        required: true,
                                        message: '房间位置不能为空!',
                                    },
                                ]}
                            >
                                <Input placeholder={'请输入房间位置'} maxLength={50}/>
                            </Form.Item>


                            <Form.Item wrapperCol={{offset: 8, span: 16}}>


                                <Space>
                                    <Button style={{width: '6em'}} type="default" onClick={this.back}>
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