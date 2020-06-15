import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, InputNumber, message, Divider, DatePicker, Card} from "antd";
import {
    addFeeSet,
    updateFeeSet,
    getFeeSet,
} from "../../../http/service";
import Util from "../../../assets/js/Util";
import store from "../../../store";
import {FEE_TYPE_LIST} from '../../../assets/js/constants/constant'

const {Option} = Select;

class Index extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.therapist_id=store.getState().user_id

        this.state = {
            formItem: {},
        }

    }

    componentDidMount() {
        this.getFeeSet()


    }



    getFeeSet = () => {
        getFeeSet({
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

        if (this.state.formItem.therapist_fee_set_id) {
            updateFeeSet(this.state.formItem).then((data) => {
                Util.success("操作成功！")

                this.getFeeSet()

            }).catch(err => {
                Util.error(err)
            })
        } else {
            addFeeSet(this.state.formItem).then((data) => {
                Util.success("操作成功！")

                this.getFeeSet()

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
                        <h3>咨询师收费设置</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={8} offset={8}>
                        <Form
                            ref={this.formRef}
                            layout="horizontal"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            onFinish={this.operate}
                        >


                            <Form.Item name="fee" label="每个时段费用（元）"
                                       rules={[{required: true, message: '费用不能为空!'}]}>
                                <InputNumber style={{width:'100%'}} min={0} max={9999} precision={2} placeholder={'请输入费用'}/>
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