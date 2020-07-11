import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message, Divider, DatePicker, Card,Cascader} from "antd";
import {
    addAppointSet,
    updateAppointSet,
    getAppointSet,
    getQualificationTypeList,
    getLevelTypeList,
    getMannerTypeList,
    getSchoolTypeList
} from "../../../http/service";
import Util from "../../../assets/js/Util";
import store from "../../../store";
import './index.less'
import {pczOptions} from "../../../assets/js/pcz";

const {Option} = Select;

class Index extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);


        this.therapist_id=store.getState().user_id

        this.state = {
            formItem: {},
            qualificationTypeList: [],
            LevelTypeList: [],
            MannerTypeList: [],
            SchoolTypeList: [],
        }

    }

    componentDidMount() {
        this.getBaseInfo()


        this.getAppointSet()
    }

    getBaseInfo = () => {
        getQualificationTypeList().then(data => {
            this.setState({
                qualificationTypeList: data
            })
        })

        getLevelTypeList().then(data => {
            this.setState({
                LevelTypeList: data
            })
        })

        getMannerTypeList().then(data => {
            this.setState({
                MannerTypeList: data
            })
        })

        getSchoolTypeList().then(data => {
            this.setState({
                SchoolTypeList: data
            })
        })


    }


    getAppointSet = () => {
        getAppointSet({
            therapist_id: this.therapist_id
        }).then((data) => {

            if (data) {

                this.setState({
                    formItem: data
                })
                this.formRef.current.setFieldsValue(data)
            }


        }).catch(err => {
            Util.error(err)
        })
    }
    operate = (form) => {


        this.setState({
            formItem: Object.assign({therapist_id: this.therapist_id}, this.state.formItem, form)
        })

        if (this.state.formItem.therapist_attach_relation_id) {
            updateAppointSet(this.state.formItem).then((data) => {
                Util.success("操作成功！")

                this.getBaseInfo()

            }).catch(err => {
                Util.error(err)
            })
        } else {
            addAppointSet(this.state.formItem).then((data) => {
                Util.success("操作成功！")

                this.getBaseInfo()

            }).catch(err => {
                Util.error(err)
            })
        }
    }

    render() {

        function onChange(value) {
            console.log(value);
        }

        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>预约设置</h3>
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


                            <Form.Item name="school_type_id" label="流派" rules={[{required: true, message: '流派不能为空!'}]}>
                                <Select placeholder="请选择流派">
                                    {
                                        this.state.SchoolTypeList.map((item, index) => {
                                            return <Option key={index}
                                                           value={item.school_type_id}>{item.school_type_name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item name="qualification_type_id" label="资历"
                                       rules={[{required: true, message: '资历不能为空!'}]}>
                                <Select placeholder="请选择资历">
                                    {
                                        this.state.qualificationTypeList.map((item, index) => {
                                            return <Option key={index}
                                                           value={item.qualification_type_id}>{item.qualification_type_name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item name="manner_type_id" label="咨询方式"
                                       rules={[{required: true, message: '咨询方式不能为空!'}]}>
                                <Select placeholder="请选择咨询方式">
                                    {
                                        this.state.MannerTypeList.map((item, index) => {
                                            return <Option key={index}
                                                           value={item.manner_type_id}>{item.manner_type_name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item name="level_type_id" label="等级" rules={[{required: true, message: '等级不能为空!'}]}>
                                <Select placeholder="请选择等级">
                                    {
                                        this.state.LevelTypeList.map((item, index) => {
                                            return <Option key={index}
                                                           value={item.level_type_id}>{item.level_type_name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item name="emergency" label="紧急咨询" rules={[{required: true, message: '紧急咨询不能为空!'}]}>
                                <Select placeholder="请选择紧急咨询">
                                    <Option key={1} value={0}>不接受</Option>
                                    <Option key={2} value={1}>接受</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name="area" label="咨询区域" rules={[{required: true, message: '紧急咨询不能为空!'}]}>
                                <Cascader options={pczOptions} onChange={onChange} placeholder="请选择区域" />
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
