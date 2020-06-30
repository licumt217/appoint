import React, {Component} from 'react';
import {Form, Input} from "antd";

class Zhidaoyu extends Component {
    render() {
        return (
            <Form.Item name={'name'} label="请输入指导语" rules={[
                {
                    required: true,
                    message: '指导语不能为空!',
                },
            ]}>
                <Input.TextArea rows={5} placeholder={'请输入指导语'}></Input.TextArea>
            </Form.Item>
        );
    }
}

export default Zhidaoyu;