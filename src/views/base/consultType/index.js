import React, {Component} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, Pagination, Row, Modal, Space, Table} from "antd";
import Util from "../../../assets/js/Util";

import {getConsultTypeList, addConsultType, updateConsultType, deleteConsultType} from "../../../http/service";


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

        getConsultTypeList().then((data) => {

            this.setState({
                data
            })

        }).catch(err => {
            Util.error(err)
        })
    }


    addOrUpdate = () => {

        let consult_type_name = this.formRef.current.getFieldValue('consult_type_name')
        let consult_type_id = this.formRef.current.getFieldValue('consult_type_id')
        let remark = this.formRef.current.getFieldValue('remark')

        if (!this.isEdit) {

            addConsultType({
                consult_type_name,
                remark
            }).then(() => {
                Util.success("操作成功")
                this.close()
                this.getList()
            }).catch(err => {
                Util.error(err)
            })
        } else {


            updateConsultType({
                consult_type_id,
                consult_type_name,
                remark
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

                deleteConsultType({
                    consult_type_id: row.consult_type_id
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
                    render:(text,row,index)=>{
                        return index+1;
                    }
                },
                {
                    title: '预约类型',
                    dataIndex: 'consult_type_name',
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                },
                {
                    title: '操作',
                    dataIndex: 'action',
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
                    title="预约类型"
                    visible={this.state.visible}
                    onOk={this.modalOnOk}
                    onCancel={this.close}
                >
                    <Form ref={this.formRef}
                          labelCol={{span: 6}}
                          onFinish={this.addOrUpdate}

                    >
                        <Form.Item name={'consult_type_name'} label={'预约类型'} rules={[
                            {
                                required: true,
                                message: '预约类型不能为空!',
                            },
                        ]}>
                            <Input placeholder='请输入预约类型'></Input>
                        </Form.Item>
                        <Form.Item name={'remark'} label={'备注'}>
                            <Input.TextArea rows={5} placeholder='请输入备注'></Input.TextArea>
                        </Form.Item>
                    </Form>
                </Modal>


                <Row>
                    <Col span={22}>
                        <h3>预约类型管理</h3>
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