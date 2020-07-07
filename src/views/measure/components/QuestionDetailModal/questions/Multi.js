import React, {Component} from 'react';
import {Form, Input, Row, Col, Button, Select, Checkbox, Radio, Upload} from "antd";
import Util from "../../../../../assets/js/Util";
import {upLoadFile} from "../../../../../http/service";
import {DeleteFilled, PlusOutlined, UploadOutlined} from '@ant-design/icons';

class Wenda extends Component {
    constructor(props) {
        super(props);
        this.form = this.props.form;
        this.suffixArrayOfMusic = ["mp3", "wave"]
        this.suffixArrayOfPicture = ["jpg", "jpeg", "png"]
        this.state = {
        }

    }


    componentDidMount() {
        if(this.props.isEdit){
            setTimeout(()=>{
                let data=this.props.data;
                this.props.form.current.setFieldsValue({
                    name:data.name,
                    mediaType:'picture',
                    children:data.children
                })
            },1)
        }else{
            setTimeout(()=>{
                this.props.form.current.setFieldsValue({
                    mediaType:'picture',
                    children:[{
                        answer:[{}]
                    }]
                })
            },1)
        }
    }


    beforeUpload = (file) => {
        let size = file / 1000 / 1000;//M

        let suffix = file.name.split('.')

        suffix = suffix[suffix.length - 1]

        if (size > 10) {
            Util.warning("文件大小不能超过10M!")
            this.file = null;
            return false;
        }

        let mediaType = this.form.current.getFieldValue("mediaType")

        if (mediaType === 'music') {
            if (this.suffixArrayOfMusic.indexOf(suffix) === -1) {
                Util.warning(`只能上传${this.suffixArrayOfMusic}格式的文件!`)
                this.file = null;
                return false;
            }
        } else {
            if (this.suffixArrayOfPicture.indexOf(suffix) === -1) {
                Util.warning(`只能上传${this.suffixArrayOfPicture}格式的文件!`)
                this.file = null;
                return false;
            }
        }

        let formData = new FormData()

        formData.append('file', file)

        upLoadFile(formData).then(data => {

            this.setState({
                file
            })

            let url = data.url

            this.form.current.setFieldsValue({
                url
            })

        }).catch(error => {
            Util.error(error)
        })

        return false;
    }

    render() {
        return (
            <React.Fragment>

                <Form.Item name={'name'} label="多媒体矩阵标题" rules={[
                    {
                        required: true,
                        message: '标题不能为空!',
                    },
                ]}>
                    <Input.TextArea rows={5} placeholder={'请输入多媒体矩阵标题'}></Input.TextArea>
                </Form.Item>

                <Form.Item
                    name="mediaType"
                    label="多媒体类型"
                    rules={[
                    {
                        required: true,
                        message: '请选择多媒体类型!',
                    },
                ]}>
                    <Radio.Group >
                        <Radio value="music">音频</Radio>
                        <Radio value="picture">图片</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label='文件上传'>
                    <Upload
                        showUploadList={false}
                        beforeUpload={this.beforeUpload}
                    >
                        <Button>
                            <UploadOutlined/> 请选择要上传的文件
                        </Button>
                    </Upload>
                    {
                        this.state.file ?
                            <div>已上传文件: {this.state.file.name}</div>
                            :
                            null
                    }
                </Form.Item>

                <Form.Item name={'url'} style={{display:'none'}}>
                    <Input></Input>
                </Form.Item>


                <Row style={{marginTop: "10px", fontSize: "1em", fontWeight: "bold"}}>
                    <Col span={15} offset={6}>
                        子条目标题
                    </Col>
                    <Col span="2" offset="1">
                        移除
                    </Col>
                </Row>

                <Form.List name="children">
                    {(fields, {add, remove}) => {
                        return (
                            <div>

                                {fields.map((field, index) => (
                                    <Row key={index} >

                                        <Col span={6}></Col>

                                        <Col span={18}>

                                            <Row >

                                                <Col span={20} >
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


                                                    <Row style={{marginTop: "10px", fontSize: "1em", fontWeight: "bold"}}>
                                                        <Col span="14">
                                                            选项文字
                                                        </Col>
                                                        <Col span="7" >
                                                            分数
                                                        </Col>
                                                        <Col span="2" offset="1">
                                                            移除
                                                        </Col>
                                                    </Row>
                                                    <Form.List
                                                        fieldKey={[field.fieldKey, 'answer']}
                                                        name={[field.name, 'answer']}>
                                                        {(fields, {add, remove}) => {
                                                            return (
                                                                <div>

                                                                    {fields.map((field, index) => (
                                                                        <Row key={index}>


                                                                            <Col span="14">
                                                                                <Form.Item
                                                                                    {...field}
                                                                                    fieldKey={[field.fieldKey, 'key']}
                                                                                    name={[field.key, 'key']} rules={[
                                                                                    {
                                                                                        required: true,
                                                                                        message: '选项文字不能为空!',
                                                                                    },
                                                                                ]}>
                                                                                    <Input maxLength={200}
                                                                                           placeholder={'请输入选项文字'}></Input>
                                                                                </Form.Item>
                                                                            </Col>
                                                                            <Col span={7}>
                                                                                <Form.Item
                                                                                    name={[field.name, 'value']}
                                                                                    fieldKey={[field.fieldKey, 'value']}
                                                                                    rules={[{
                                                                                        required: true,
                                                                                        message: '分数不能为空!'
                                                                                    }]}>
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
                                                                            <Col span={2} offset={1} style={{textAlign:'center'}}>
                                                                                {
                                                                                    fields.length>1?
                                                                                        <DeleteFilled  style={{fontSize:'1.2em',marginTop:'0.4em'}}
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

                                                                    <Form.Item>
                                                                        <Button
                                                                            type="dashed"
                                                                            onClick={() => {
                                                                                add({
                                                                                    answer:[{},{}]
                                                                                });
                                                                            }}
                                                                            key={Math.random()}
                                                                            block
                                                                        >
                                                                            <PlusOutlined/> 新增选项
                                                                        </Button>
                                                                    </Form.Item>
                                                                </div>
                                                            );
                                                        }}
                                                    </Form.List>

                                                </Col>
                                                <Col span={2} offset={1} style={{textAlign:'center'}}>
                                                    {
                                                        fields.length>1?
                                                            <DeleteFilled  style={{fontSize:'1.2em',marginTop:'0.4em'}}
                                                                           onClick={() => {
                                                                               remove(field.name);
                                                                           }}
                                                            />
                                                            :
                                                            null
                                                    }

                                                </Col>
                                            </Row>

                                        </Col>


                                    </Row>
                                ))}

                                <Row>
                                    <Col span={15} offset={6}>
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add({
                                                        answer:[{}]
                                                    });
                                                }}
                                                block
                                            >
                                                <PlusOutlined/> 新增子条目
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
