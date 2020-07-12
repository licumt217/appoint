import React, {Component} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, Pagination, Row, Modal, Space, Table} from "antd";
import Util from "../../../assets/js/Util";

import {getAgreementList, addAgreement, deleteAgreement, updateAgreement} from "../../../http/service";


class Index extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.isEdit = false;
        this.state = {
            data: [],
            visible: false,

        }
    }

    componentDidMount() {
        this.getList()
    }


    close = () => {
        this.formRef.current.resetFields()
        this.setState({
            visible: false
        })
    }

    open = () => {
        this.setState({
            visible: true
        })
    }


    getList = () => {

        getAgreementList().then((data) => {

            this.setState({
                data
            })

        }).catch(err => {
            Util.error(err)
        })
    }


    addOrUpdate = () => {

        let content = this.formRef.current.getFieldValue('content')
        let agreement_id = this.formRef.current.getFieldValue('agreement_id')

        if (!this.isEdit) {

            addAgreement({
                content
            }).then(() => {
                Util.success("操作成功")
                this.close()
                this.getList()
            }).catch(err => {
                Util.error(err)
            })
        } else {


            updateAgreement({
                agreement_id,
                content,
            }).then(() => {
                Util.success("操作成功")
                this.close()
                this.getList()
            }).catch(err => {
                Util.error(err)
            })
        }
    }

    modalOnOk = () => {
        this.formRef.current.submit()
    }

    add = () => {
        this.isEdit = false;
        this.open()

    }
    edit = (row) => {
        this.open();
        setTimeout(() => {
            this.isEdit = true;
            this.formRef.current.resetFields();
            this.formRef.current.setFieldsValue(row)
        })

    }
    delete = (row) => {

        Util.confirm({
            title: '您确认删除吗？',
            content: '',
            onOk: () => {

                deleteAgreement({
                    agreement_id: row.agreement_id
                }).then(() => {
                    Util.success("删除成功")
                    this.getList()
                }).catch(err => {
                    Util.error(err)
                })

            },
            onCancel: () => {
            }
        });


    }


    render() {

        const columns = [
                {
                    title: '序号',
                    dataIndex: 'index',
                    width:'6em',
                    render:(text,row,index)=>{
                        return index+1;
                    }
                },
                {
                    title: '协议内容',
                    dataIndex: 'content',
                    ellipsis:true
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    width:'12em',
                    render: (text, row) => {
                        return (
                            <Space size="middle">
                                <Button size={"small"} type={"primary"} onClick={this.edit.bind(this, row)}>编辑</Button>
                                <Button size={"small"} type={"primary"} danger
                                        onClick={this.delete.bind(this, row)}>删除</Button>
                            </Space>
                        )


                    }
                }
            ]
        ;


        return (

            <div>

                <Modal
                    title="用户协议"
                    visible={this.state.visible}
                    onOk={this.modalOnOk}
                    onCancel={this.close}
                >
                    <Form ref={this.formRef}
                          labelCol={{span: 6}}
                          onFinish={this.addOrUpdate}

                    >
                        <Form.Item name={'content'} rules={[{required: true, message: '协议内容不能为空!'}]}>
                            <Input.TextArea rows={5} placeholder='请输入协议内容'></Input.TextArea>
                        </Form.Item>
                    </Form>
                </Modal>


                <Row>
                    <Col span={22}>
                        <h3>用户协议管理</h3>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={this.add}>新增</Button>
                    </Col>
                </Row>
                <Divider/>
                <Row justify={'center'}>
                    <Col span={24}>
                        <Table dataSource={this.state.data} columns={columns} rowKey="consult_type_id"
                               pagination={false}/>
                    </Col>
                </Row>
            </div>
        )

    }
}

export default Index;
