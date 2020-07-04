import React, {Component} from 'react';
import {Form, Input, Row, Col, Button, Select} from "antd";
import Util from "../../../../../assets/js/Util";
import {PlusOutlined,MinusCircleOutlined} from "@ant-design/icons";

class Wenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    componentDidMount() {
        if(this.props.isEdit){
            setTimeout(()=>{
                this.props.form.current.setFieldsValue({
                    name:this.props.data.name,
                    answer:this.props.data.answer
                })
            },1)
        }else{
            setTimeout(()=>{
                this.props.form.current.setFieldsValue({
                    answer:[{}],
                })
            },1)
        }
    }

    render() {
        return (
            <React.Fragment>
                <Row style={{marginTop: "10px", fontSize: "1em", fontWeight: "bold"}}>
                    <Col span="18" offset={6}>
                        选择题标题
                        {
                            !this.state.isEdit ?
                                <span>（回车键换下一题，可批量增加选项相同的题目）</span>
                                :
                                null
                        }

                    </Col>
                </Row>

                <Form.Item name={'name'} label="请输入标题" rules={[
                    {
                        required: true,
                        message: '标题不能为空!',
                    },
                ]}>
                    <Input.TextArea rows={5} placeholder={'请输入选择题标题'}></Input.TextArea>
                </Form.Item>

                <Row style={{marginTop: "10px", fontSize: "1em", fontWeight: "bold"}}>
                    <Col span="16">
                        选项文字
                    </Col>
                    <Col span="3" offset="1">
                        分数
                    </Col>
                    <Col span="3" offset="1">
                        移除
                    </Col>
                </Row>

                <Form.List name="answer">
                    {(fields, {add, remove}) => {
                        return (
                            <div>

                                {fields.map((field, index) => (
                                    <Row key={index}>


                                        <Col span="15">
                                            <Form.Item
                                                {...field}
                                                fieldKey={[field.fieldKey, 'key']}
                                                name={[field.name, 'key']} rules={[
                                                {
                                                    required: true,
                                                    message: '选项文字不能为空!',
                                                },
                                            ]}>
                                                <Input maxLength={200} placeholder={'请输入选项文字'}></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={3} offset={1}>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'value']}
                                                fieldKey={[field.fieldKey, 'value']}
                                                rules={[{required: true, message: '分数不能为空!'}]}>
                                                <Select
                                                    placeholder="请选择分数"
                                                    value={field.value}
                                                >
                                                    {
                                                        Util.questionScoreArray.map((item, index) => {
                                                            return <Select.Option key={item}
                                                                           value={item}>{item}</Select.Option>
                                                        })
                                                    }

                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={2} offset={1}>
                                            <MinusCircleOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        block
                                    >
                                        <PlusOutlined/> 新增选项
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>


            </React.Fragment>

        );
    }
}

export default Wenda;
