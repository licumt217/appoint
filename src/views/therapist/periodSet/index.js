import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, InputNumber, Checkbox, Divider, DatePicker, Card} from "antd";
import {
    getTherapistPeriodSet,
    updateTherapistPeriodSet,
} from "../../../http/service";
import Util from "../../../assets/js/Util";
import store from "../../../store";
import moment from 'moment'

class Index extends Component {

    formRef = React.createRef();



    constructor(props) {
        super(props);

        this.options =this.getOptions()

        this.weekOptions = this.getWeekOptions();

        this.therapist_id=store.getState().user_id

        this.state = {
            formItem: {},
        }

    }

    componentDidMount() {
        this.getUseablePeriodSet()

    }

    getOptions=()=>{
        let array=[]
        for(let i=0;i<24;i++){
            array.push({
                label:`${i}:00-${i}:50`,
                value:String(i)
            })
        }
        return array;
    }

    getWeekOptions = () => {
        let array = [
            {
                label: '周日',
                value: "0"
            },
            {
                label: '周一',
                value: "1"
            }, {
                label: '周二',
                value: "2"
            },
            {
                label: '周三',
                value: "3"
            },
            {
                label: '周四',
                value: "4"
            },
            {
                label: '周五',
                value: "5"
            },
            {
                label: '周六',
                value: "6"
            }]
        return array;
    }



    getUseablePeriodSet = () => {
        getTherapistPeriodSet({
            therapist_id: this.therapist_id
        }).then((data) => {

            let period=data.period.split(',')
            let weeks=data.weeks.split(',')
            this.formRef.current.setFieldsValue({
                period,
                weeks
            })
            if(data.end_date){
                let end_date=moment(data.end_date)
                this.formRef.current.setFieldsValue({
                    end_date,
                })
            }

        }).catch(err => {
            Util.error(err)
        })
    }
    updateTherapistPeriodSet = (form) => {

        let weeks=form.weeks?form.weeks.join(','):''
        let period=form.period?form.period.join(','):''

        let end_date=Util.getDateFromMoment(form.end_date)
        updateTherapistPeriodSet({
            weeks,
            period,
            end_date,
            therapist_id:this.therapist_id
        }).then((data) => {
            Util.success("操作成功！")

            this.getUseablePeriodSet()

        }).catch(err => {
            Util.error(err)
        })
    }

    render() {


        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>咨询师可用时段设置</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row justify={'center'}>
                    <Col span={24}  >
                        <Form
                            ref={this.formRef}
                            // layout="vertical"
                            labelCol={{span:4}}
                            onFinish={this.updateTherapistPeriodSet}
                        >

                            <Form.Item
                                label="有效期（北京时间）"
                                name="end_date"
                                format="YYYY-MM-DD"
                                rules={[
                                    {
                                        required: true,
                                        message: '有效期不能为空!',
                                    },
                                ]}
                            >
                                <DatePicker/>
                            </Form.Item>

                            <Form.Item name="weeks"
                                       label="请设置周次"
                                       rules={[
                                           {
                                               required: true,
                                               message: '周次不能为空!',
                                           },
                                       ]}
                            >
                                <Checkbox.Group style={{width:'100%'}}>
                                    <Row>
                                        {
                                            this.weekOptions.map((item, index) => {
                                                return (
                                                    <Col span={3} key={index}>
                                                        <Checkbox value={item.value} style={{marginBottom: '.5em'}}>{item.label}</Checkbox>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>

                            <Form.Item name="period"
                                       label="请设置可用时段"
                                       rules={[
                                           {
                                               required: true,
                                               message: '可用时段不能为空!',
                                           },
                                       ]}
                            >
                                <Checkbox.Group>
                                    <Row>
                                        {
                                            this.options.map((item,index)=>{
                                                return (
                                                    <Col span={4} key={index}>
                                                        <Checkbox value={item.value} style={{marginBottom:'.5em'}}>{item.label}</Checkbox>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Checkbox.Group>
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
