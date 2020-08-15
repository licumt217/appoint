import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message, Divider, DatePicker, Card, Cascader} from "antd";
import {addStation,updateStation} from "../../../http/service";
import Util from "../../../assets/js/Util";
import moment from 'moment'
import Role from "../../../assets/js/Role";
import './index.less'
import {pczOptions} from "../../../assets/js/pcz";
const {Option} = Select;

class Index extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.isEdit = this.props.location.state && this.props.location.state.opType === 'edit'

        let obj={

        }
        if(this.isEdit){
            let formItem=this.props.location.state.formItem
            if(formItem.station_province){
                obj=Object.assign({
                    area:[formItem.station_province,formItem.station_city]
                },formItem)
            }else{
                obj=this.props.location.state.formItem;
            }
        }

        this.state = {
            formItem: obj
        }

    }

    componentDidMount() {
        this.formRef.current.setFieldsValue(this.state.formItem)
    }

    back=()=>{
        this.props.history.goBack();
    }




    operate = (form) => {

        this.setState({
            formItem: Object.assign(this.state.formItem, form)
        })


        if (!Util.isValidPhone(this.state.formItem.phone)) {
            Util.warning("请输入合法的手机号！")
            return;
        }



        if(this.isEdit){
            updateStation(this.state.formItem).then((data) => {
                Util.success("操作成功！")

                this.back()

            }).catch(err => {
                Util.error(err)
            })
        }else{
            addStation(this.state.formItem).then((data) => {
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
                        <h3>工作室操作</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={8} offset={8}>
                        <Form
                            ref={this.formRef}
                            layout="horizontal"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 19}}
                            onFinish={this.operate}
                        >

                            <Form.Item
                                label="工作室名称"
                                name="station_name"
                                rules={[
                                    {
                                        required: true,
                                        message: '工作室名称不能为空!',
                                    },
                                ]}
                            >
                                <Input placeholder={'请输入工作室名称'} maxLength={20}/>
                            </Form.Item>

                            <Form.Item
                                label="工作室地址"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: '工作室地址不能为空!',
                                    },
                                ]}
                            >
                                <Input key={1} placeholder={'请输入工作室地址'} maxLength={11}/>
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
                            <Form.Item label="区域"
                                       name="area"
                                       rules={[
                                           {
                                               required: true,
                                               message: '区域不能为空!',
                                           },
                                       ]}>
                                <Cascader options={pczOptions} placeholder="请选择区域" />
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