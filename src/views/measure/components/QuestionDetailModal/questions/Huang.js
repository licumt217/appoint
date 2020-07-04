import React, {Component} from 'react';
import {Form, Input, Row, Col, Button, Select, Radio} from "antd";
import Util from "../../../../../assets/js/Util";
import {PlusOutlined,DeleteFilled} from "@ant-design/icons";

class Wenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    componentDidMount() {
        if(this.props.isEdit){
            setTimeout(()=>{
                let data=this.props.data;
                this.props.form.current.setFieldsValue({
                    name:data.name,
                    lieRule:data.lieRule,
                    answer:data.answer
                })
            },1)
        }else{
            setTimeout(()=>{
                this.props.form.current.setFieldsValue({
                    answer:[{}]
                })
            },1)
        }
    }


    render() {
        return (
            <React.Fragment>

                <Form.Item name={'name'} label="请输入标题" rules={[
                    {
                        required: true,
                        message: '标题不能为空!',
                    },
                ]}>
                    <Input.TextArea rows={2} placeholder={'请输入测谎选择题标题'}></Input.TextArea>
                </Form.Item>

                <Form.Item name="lieRule" label="计分规则"  rules={[
                    {
                        required: true,
                        message: '请选择计分规则!',
                    },
                ]}>
                    <Radio.Group>
                        <Radio value={0}>相同选项计分</Radio>
                        <Radio value={1}>不同选项计分</Radio>
                    </Radio.Group>
                </Form.Item>


                <Row style={{marginTop: "10px", fontSize: "1em", fontWeight: "bold"}}>
                    <Col span="10" offset={6}>
                        选项文字
                    </Col>
                    <Col span="4" offset="1">
                        分数
                    </Col>
                    <Col span="1" offset="1">
                        移除
                    </Col>
                </Row>

                <Form.List name="answer">
                    {(fields, {add, remove}) => {
                        return (
                            <div>

                                {fields.map((field, index) => (
                                    <Row key={index}>


                                        <Col span="10" offset={6}>
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
                                        <Col span={4} offset={1}>
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
                                        <Col span={1} offset={1}>
                                            {
                                                fields.length>1?
                                                    <DeleteFilled style={{fontSize:'1.2em',marginTop:'0.4em'}}
                                                        onClick={() => {
                                                            remove(field.name);
                                                        }}
                                                    />
                                                    :
                                                    null
                                            }
                                        </Col>
                                    </Row>
                                ))}

                                <Row>
                                    <Col span={18} offset={6}>
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
                                    </Col>
                                </Row>
                            </div>
                        );
                    }}
                </Form.List>


            </React.Fragment>

        );
    }
}

export default Wenda;
