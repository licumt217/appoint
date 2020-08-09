import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message, Divider, DatePicker, Card, Cascader} from "antd";
import {updateCv, addCv,getCvByTherapistId} from "../../../http/service";
import Util from "../../../assets/js/Util";
import './index.less'
import store from "../../../store";

class Index extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            data:null
        }

    }

    componentDidMount() {
        this.getCvByTherapistId()
    }

    back = () => {
        this.props.history.goBack()
    }

    getCvByTherapistId = () => {
        getCvByTherapistId({
            therapist_id:store.getState().user_id
        }).then((data) => {

            this.setState({
                data
            })
            this.formRef.current.setFieldsValue(data)

        }).catch(err => {
            Util.error(err)
        })
    }
    operate = (form) => {

        let obj=Object.assign({}, form);

        if(this.state.data){
            obj.cv_id=this.state.data.cv_id;
            updateCv(obj).then((data) => {
                Util.success("操作成功")

                this.getCvByTherapistId()

            }).catch(err => {
                Util.error(err)
            })
        }else{
            addCv(obj).then((data) => {
                Util.success("操作成功！")

                this.getCvByTherapistId()

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
                        <h3>个人简历</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={10} offset={6}>
                        <Form
                            ref={this.formRef}
                            layout="horizontal"
                            labelCol={{span: 4}}
                            wrapperCol={{span: 20}}
                            onFinish={this.operate}
                        >
                            <Form.Item
                                label="资质"
                                name="qualification"
                                rules={[
                                    {
                                        required: true,
                                        message: '资质不能为空!',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder={'请输入资质'} maxLength={11}/>
                            </Form.Item>

                            <Form.Item
                                label="擅长领域"
                                name="field"
                                rules={[
                                    {
                                        required: true,
                                        message: '擅长领域不能为空!',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4}  placeholder={'请输入擅长领域'} maxLength={21}/>
                            </Form.Item>

                            <Form.Item
                                label="临床经验"
                                name="experience"
                                rules={[
                                    {
                                        required: true,
                                        message: '临床经验不能为空!',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4}  placeholder={'请输入临床经验'} maxLength={20}/>
                            </Form.Item>

                            <Form.Item
                                label="受训经历"
                                name="train"
                                rules={[
                                    {
                                        required: true,
                                        message: '受训经历不能为空!',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4}  placeholder={'请输入受训经历'} maxLength={20}/>
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
