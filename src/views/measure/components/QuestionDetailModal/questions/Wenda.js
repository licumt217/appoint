import React, {Component} from 'react';
import {Form, Input} from "antd";

class Wenda extends Component {

    constructor(props){

        super(props)

    }
    componentDidMount() {
        if(this.props.data){
            setTimeout(()=>{
                this.props.form.current.setFieldsValue({
                    name:this.props.data.name
                })
            },1)
        }
    }

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
