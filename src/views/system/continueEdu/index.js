import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, Switch, Divider, DatePicker,Radio} from "antd";
import {getContinueEduSettingByDivisionId, updateContinueEduSetting} from "../../../http/service";
import FUNCTION_LEVEL from "../../../assets/js/constants/FUNCTION_LEVEL";
import RECEIVE_SIDE from "../../../assets/js/constants/RECEIVE_SIDE";
import Util from "../../../assets/js/Util";
import moment from "moment";

const {Option} = Select;

class Index extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            data:{}
        }
    }

    componentDidMount() {
        this.getContinueEduSettingByDivisionId();
    }

    getContinueEduSettingByDivisionId=()=>{
        getContinueEduSettingByDivisionId().then(data=>{
            data.start_date=moment(data.start_date)
            data.end_date=moment(data.end_date)
            data.continue_edu_state=data.continue_edu_state===1
            this.formRef.current.setFieldsValue(data)
            this.setState({
                data
            })
        }).catch(err=>{
            Util.error(err)
        })
    }


    operate = (values) => {

        values.start_date = Util.getDateFromMoment(values.start_date)
        values.end_date = Util.getDateFromMoment(values.end_date)
        values.continue_edu_state = values.continue_edu_state?1:0;
        values.setting_id = this.state.data.setting_id

       updateContinueEduSetting(values).then(data=>{

           Util.success('操作成功！')
       }).catch(err=>{
           Util.error(err)
       })



    }

    render() {



        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>继续教育设置</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col offset={6} span={18}>

                        <Form
                            ref={this.formRef}
                            name="basic"
                            labelCol={{span: 6}}
                            onFinish={this.operate}
                        >
                            <Form.Item
                                valuePropName={'checked'}
                                label="继续教育填写开关"
                                name="continue_edu_state"
                                //
                            >
                                <Switch
                                    // checked={this.state.formItem.continue_edu_state===0?false:true}
                                />
                            </Form.Item>


                            <Form.Item
                                label="开始日期"
                                name="start_date"
                                format="YYYY-MM-DD"
                                rules={[
                                    {
                                        required: true,
                                        message: '开始日期不能为空!',
                                    },
                                ]}
                            >
                                <DatePicker/>
                            </Form.Item>

                            <Form.Item
                                label="结束日期"
                                name="end_date"
                                format="YYYY-MM-DD"
                                rules={[
                                    {
                                        required: true,
                                        message: '结束日期不能为空!',
                                    },
                                ]}
                            >
                                <DatePicker/>
                            </Form.Item>


                            <Form.Item wrapperCol={{offset: 5}}>
                                <br/>
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        保存
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