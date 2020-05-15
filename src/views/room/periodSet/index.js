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

        this.options =this.getOptions()

        this.state = {
            formItem: {},
        }

    }

    componentDidMount() {
        this.getUseablePeriodSet()

    }

    back=()=>{
        this.props.history.goBack()
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
        getRoomPeriodSet({
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

        updateRoomPeriodSet({
            period,
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