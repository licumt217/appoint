import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, InputNumber, Checkbox, Divider, DatePicker, Card} from "antd";
import {
    getUseablePeriodSet,
    updateUseablePeriodSet,
} from "../../../http/service";
import Util from "../../../assets/js/Util";
import store from "../../../store";

class Index extends Component {

    formRef = React.createRef();



    constructor(props) {
        super(props);

        this.options =this.getOptions()

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



    getUseablePeriodSet = () => {
        getUseablePeriodSet({
            therapist_id: this.therapist_id
        }).then((data) => {

            let period=data.period.split(',')
            this.formRef.current.setFieldsValue({
                period
            })

        }).catch(err => {
            Util.error(err)
        })
    }
    updateUseablePeriodSet = (form) => {

        let period=form.period?form.period.join(','):''

        updateUseablePeriodSet({
            period,
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
                    <Col span={18}  >
                        <Form
                            ref={this.formRef}
                            layout="vertical"
                            onFinish={this.updateUseablePeriodSet}
                        >



                            <Form.Item name="period" label="请设置可用时段">
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