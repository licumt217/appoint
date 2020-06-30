import React, {Component} from 'react';
import {Form, Input} from "antd";

class Wenda extends Component {
    render() {
        return (
            <Form.Item name={'name'} label="请输入问答标题" rules={[
                {
                    required: true,
                    message: '标题不能为空!',
                },
            ]}>
                <Input.TextArea rows={5} placeholder={'请输入问答标题'}></Input.TextArea>
            </Form.Item>
        );
    }
}

export default Wenda;