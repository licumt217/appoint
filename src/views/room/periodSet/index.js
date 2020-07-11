import React, {Component} from 'react';
import {Button, Col, Row, Form, Space, Checkbox, Divider} from "antd";
import {
    getRoomPeriodSet,
    updateRoomPeriodSet,
} from "../../../http/service";
import Util from "../../../assets/js/Util";
import store from "../../../store";

class Index extends Component {

    formRef = React.createRef();


    constructor(props) {
        super(props);

        this.options = this.getOptions()
        this.weekOptions = this.getWeekOptions();

        this.state = {
            formItem: {},
        }

    }

    componentDidMount() {
        this.getUseablePeriodSet()

    }

    back = () => {
        this.props.history.goBack()
    }

    getOptions = () => {
        let array = []
        for (let i = 0; i < 24; i++) {
            array.push({
                label: `${i}:00-${i}:50`,
                value: String(i)
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
        getRoomPeriodSet({}).then((data) => {

            let period = data.period.split(',')
            let weeks = data.weeks.split(',')
            this.formRef.current.setFieldsValue({
                period,
                weeks
            })

        }).catch(err => {
            Util.error(err)
        })
    }
    updateUseablePeriodSet = (form) => {

        let period = form.period ? form.period.join(',') : ''
        let weeks = form.weeks ? form.weeks.join(',') : ''

        if(!weeks){
            Util.info('周次不能为空！')
            return;
        }

        if(!period){
            Util.info('可用时段不能为空！')
            return;
        }

        updateRoomPeriodSet({
            period,
            weeks
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
                        <h3>房间可用时段设置</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row justify={'center'}>
                    <Col span={18}>
                        <Form
                            ref={this.formRef}
                            layout="vertical"
                            onFinish={this.updateUseablePeriodSet}
                        >


                            <Form.Item name="weeks" label="请设置周次">
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

                            <Form.Item name="period" label="请设置可用时段">
                                <Checkbox.Group>
                                    <Row>
                                        {
                                            this.options.map((item, index) => {
                                                return (
                                                    <Col span={4} key={index}>
                                                        <Checkbox value={item.value} style={{marginBottom: '.5em'}}>{item.label}</Checkbox>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Checkbox.Group>
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
