import React, {Component} from 'react';
import {Button, Col, Row, Form, Input, Select, Space, message, Divider, DatePicker, Radio, Upload, Switch} from "antd";
import {updateContinueEdu, getContinueEduItemList, uploadContinueEduFile, addContinueEdu} from "../../../../http/service";
import {DeleteFilled, PlusOutlined} from "@ant-design/icons";
import Util from "../../../../assets/js/Util";

class Index extends Component {

    formRef = React.createRef()

    constructor(props) {
        super(props);

        this.isEdit = this.props.location.state && this.props.location.state.opType === 'edit'
        this.isQuery = this.props.location.state && this.props.location.state.opType === 'query'


        this.state = {
            formItem: (this.isEdit || this.isQuery) ? this.props.location.state.formItem : {},
            files: [{
                uid: '1',
                name: 'xxx.png',
            }]
        }
    }

    componentDidMount() {
       if(this.isEdit || this.isQuery){
           this.continue_edu_id=this.props.location.state.continue_edu_id
           getContinueEduItemList({
               continue_edu_id:this.continue_edu_id
           }).then(data=>{
               this.formRef.current.setFieldsValue({
                   data
               })
           }).catch(error => {
               Util.error(error)
           })
       }
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

            let files = this.state.files;

            files.push({
                name: data.url,
                uid: data.url
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

        if (this.state.files.length === 0) {
            Util.info('请上传文件！')
            return;
        }

        if (this.isEdit) {

        } else {
            addContinueEdu({
                name: values.name,
                attachment: JSON.stringify(this.state.files)
            }).then(data => {

                Util.success('操作成功')
                this.back()
            }).catch(error => {
                Util.error(error)
            })

        }

    }

    onRemove = (file) => {
        let uid = file.uid;

        let files = this.state.files;
        let index = files.findIndex(item => {
            return item.uid === uid;
        })

        files.splice(index, 1);

        this.setState({
            files
        })

    }

    commit = () => {
        this.formRef.current.submit();
    }

    save = (values) => {

        let data=values.data;
        if(data && data.length>0){
            data.forEach(item=>{
                item.is_authorized=item.is_authorized?1:0;
            })

            if(this.isEdit){

                updateContinueEdu({
                    data,
                    continue_edu_id:this.continue_edu_id
                }).then(data => {

                    Util.success('操作成功')
                    this.back()
                }).catch(error => {
                    Util.error(error)
                })
            }else{
                addContinueEdu({
                    data
                }).then(data => {

                    Util.success('操作成功')
                    this.back()
                }).catch(error => {
                    Util.error(error)
                })
            }



        }else{
            Util.info(`请至少添加一条继续教育记录`)
        }

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

                <Form
                    ref={this.formRef}
                    onFinish={this.save}
                >
                    <Form.List name="data">
                        {(fields, {add, remove}) => {
                            return (
                                <div>

                                    {fields.map((field, index) => (
                                        <Row key={index}
                                             style={{border: '1px dashed gray', padding: '2em', marginBottom: '1em'}}>

                                            <Col span="20">
                                                <Form.Item
                                                    labelCol={{span: 5}}
                                                    label={"培训名称"}
                                                    {...field}
                                                    fieldKey={[field.fieldKey, 'train_name']}
                                                    name={[field.name, 'train_name']} rules={[
                                                    {
                                                        required: true,
                                                        message: '培训名称不能为空!',
                                                    },
                                                ]}>
                                                    <Input disabled={this.isQuery} maxLength={200} placeholder={'请输入培训名称'}></Input>
                                                </Form.Item>
                                            </Col>

                                            <Col span="20">
                                                <Form.Item
                                                    labelCol={{span: 5}}
                                                    label={"课时"}
                                                    {...field}
                                                    fieldKey={[field.fieldKey, 'hours']}
                                                    name={[field.name, 'hours']} rules={[
                                                    {
                                                        required: true,
                                                        message: '课时不能为空!',
                                                    },
                                                ]}>
                                                    <Input disabled={this.isQuery}  maxLength={200} placeholder={'请输入课时'}></Input>
                                                </Form.Item>
                                            </Col>

                                            <Col span="20">
                                                <Form.Item
                                                    labelCol={{span: 5}}
                                                    label={"培训师"}
                                                    {...field}
                                                    fieldKey={[field.fieldKey, 'train_teacher']}
                                                    name={[field.name, 'train_teacher']} rules={[
                                                    {
                                                        required: true,
                                                        message: '培训师不能为空!',
                                                    },
                                                ]}>
                                                    <Input disabled={this.isQuery}  maxLength={200} placeholder={'请输入培训师'}></Input>
                                                </Form.Item>
                                            </Col>

                                            <Col span="20">
                                                <Form.Item
                                                    labelCol={{span: 5}}
                                                    label={"主办单位"}
                                                    {...field}
                                                    fieldKey={[field.fieldKey, 'organizer']}
                                                    name={[field.name, 'organizer']} rules={[
                                                    {
                                                        required: true,
                                                        message: '主办单位不能为空!',
                                                    },
                                                ]}>
                                                    <Input disabled={this.isQuery}  maxLength={200} placeholder={'请输入主办单位'}></Input>
                                                </Form.Item>
                                            </Col>

                                            <Col span="20">
                                                <Form.Item
                                                    labelCol={{span: 5}}
                                                    valuePropName={'checked'}
                                                    label={"是否注册系统认证的继续教育项目"}
                                                    {...field}
                                                    fieldKey={[field.fieldKey, 'is_authorized']}
                                                    name={[field.name, 'is_authorized']}
                                                >
                                                    <Switch  disabled={this.isQuery}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            {
                                                !this.isQuery?
                                                    <Col span={3} offset={1}>
                                                        <DeleteFilled style={{fontSize: '1.2em', marginTop: '0.4em'}}
                                                                      onClick={() => {
                                                                          remove(field.name);
                                                                      }}
                                                        />
                                                    </Col>
                                                    :
                                                    null
                                            }
                                        </Row>
                                    ))}

                                    {
                                        !this.isQuery?
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
                                            :
                                            null
                                    }
                                </div>
                            );
                        }}
                    </Form.List>
                </Form>

                <div style={{textAlign:'center'}}>
                    <Space>
                        <Button type="default" onClick={this.back}>
                            返回
                        </Button>
                        {
                            !this.isQuery?
                                <Button type="primary" onClick={this.commit}>
                                    保存
                                </Button>
                                :
                                null
                        }
                    </Space>
                </div>
            </div>
        );
    }
}

export default Index;