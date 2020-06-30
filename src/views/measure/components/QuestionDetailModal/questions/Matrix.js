import React, {Component} from 'react';
import {Form, Input, Row, Col, Button, Select,Checkbox} from "antd";
import Util from "../../../../../assets/js/Util";
import DeleteFilled from "@ant-design/icons/lib/icons/DeleteFilled";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import MinusCircleOutlined from "@ant-design/icons/lib/icons/MinusCircleOutlined";

class Wenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            tiaomu: {
                answer: []
            }
        }

    }

    addOption = () => {
        let tiaomu = this.state.tiaomu;

        tiaomu.answer.push({
            name: '',
            value: 0
        })

        this.setState({
            tiaomu
        })
    }

    render() {
        return (
            <React.Fragment>

                <Form.Item name={'name'} label="请输入矩阵标题" rules={[
                    {
                        required: true,
                        message: '标题不能为空!',
                    },
                ]}>
                    <Input.TextArea rows={5} placeholder={'请输入矩阵标题'}></Input.TextArea>
                </Form.Item>

                <Row style={{marginTop: "10px", fontSize: "1em", fontWeight: "bold"}}>
                    <Col span="16">
                        子条目标题
                    </Col>
                    <Col span="3" offset="1">
                        反向
                    </Col>
                    <Col span="3" offset="1">
                        移除
                    </Col>
                </Row>

                <Form.List name="children">
                    {(fields, {add, remove}) => {
                        return (
                            <div>

                                {fields.map((field, index) => (
                                    <Row key={index}>


                                        <Col span="15">
                                            <Form.Item
                                                {...field}
                                                fieldKey={[field.fieldKey, 'name']}
                                                name={[field.name, 'name']} rules={[
                                                {
                                                    required: true,
                                                    message: '标题不能为空!',
                                                },
                                            ]}>
                                                <Input maxLength={200} placeholder={'请输入子条目标题'}></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={3} offset={1}>
                                            <Form.Item {...field}
                                                       name={[field.name, 'isReverse']}
                                                       fieldKey={[field.fieldKey, 'isReverse']}>
                                                <Checkbox/>
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
                                        <PlusOutlined/> 新增子条目
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>

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