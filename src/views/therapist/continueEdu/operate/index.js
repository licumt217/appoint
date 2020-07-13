import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message, Divider, DatePicker, Radio, Upload} from "antd";
import {addDivision, updateDivision,uploadContinueEduFile,addContinueEdu} from "../../../../http/service";
import FUNCTION_LEVEL from "../../../../assets/js/constants/FUNCTION_LEVEL";
import RECEIVE_SIDE from "../../../../assets/js/constants/RECEIVE_SIDE";
import {UploadOutlined} from "@ant-design/icons";
import Util from "../../../../assets/js/Util";

const {Option} = Select;

class Index extends Component {

    formRef=React.createRef()
    constructor(props) {
        super(props);

        this.isEdit = this.props.location.state && this.props.location.state.opType === 'edit'


        this.state = {
            formItem: this.isEdit ? this.props.location.state.formItem : {},
            files:[{
                uid: '1',
                name: 'xxx.png',
            }]
        }
    }

    componentDidMount() {
        this.formRef.current.setFieldsValue({
            name:'2222',
            // files:this.state.files
        })
    }


    back = () => {
        this.props.history.goBack()
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

        if (Util.suffixArrayOfPicture.indexOf(suffix) === -1) {
            Util.warning(`只能上传${this.suffixArrayOfPicture}格式的文件!`)
            this.file = null;
            return false;
        }

        let formData = new FormData()

        formData.append('file', file)

        uploadContinueEduFile(formData).then(data => {

            let files=this.state.files;

            files.push({
                name: data.url,
                uid:data.url
            })

            this.setState({
                files
            })

        }).catch(error => {
            Util.error(error)
        })

        return false;
    }

    operate = (values) => {

        if(this.state.files.length===0){
            Util.info('请上传文件！')
            return;
        }

        if(this.isEdit){

        }else{
            addContinueEdu({
                name:values.name,
                attachment:JSON.stringify(this.state.files)
            }).then(data=>{

                Util.success('操作成功')
                this.back()
            }).catch(error => {
                Util.error(error)
            })

        }

    }

    onRemove=(file)=>{
        let uid=file.uid;

        let files=this.state.files;
        let index=files.findIndex(item=>{
            return item.uid===uid;
        })

        files.splice(index,1);

        this.setState({
            files
        })

    }

    render() {


        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>完善继续教育信息</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col offset={4} span={12}>

                        <Form
                            ref={this.formRef}
                            name="basic"
                            labelCol={{span: 6}}
                            initialValues={this.state.formItem}
                            onFinish={this.operate}
                        >
                            <Form.Item
                                label="名称"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: '名称不能为空!',
                                    },
                                ]}
                            >
                                <Input placeholder={'请输入名称'}/>
                            </Form.Item>

                            <Form.Item
                                label='上传附件'
                                name="files"
                            >
                                <Upload
                                    onRemove={this.onRemove}
                                    fileList={this.state.files}
                                    beforeUpload={this.beforeUpload}
                                >
                                    <Button>
                                        <UploadOutlined/> 请选择要上传的文件
                                    </Button>
                                </Upload>
                            </Form.Item>


                            <Form.Item wrapperCol={{offset: 10, span: 14}}>


                                <Space>
                                    <Button type="default" onClick={this.back}>
                                        返回
                                    </Button>
                                    <Button type="primary" htmlType="submit">
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