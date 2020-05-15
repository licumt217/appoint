import React, {Component} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Modal, Space, Table} from "antd";
import Util from "../../../assets/js/Util";

import {getLevelTypeList, addLevelType, updateLevelType, deleteLevelType} from "../../../http/service";


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

        getLevelTypeList().then((data) => {

            this.setState({
                data
            })

        }).catch(err => {
            Util.error(err)
        })
    }


    addOrUpdate = () => {

        let level_type_name = this.formRef.current.getFieldValue('level_type_name')
        let level_type_id = this.formRef.current.getFieldValue('level_type_id')
        let divide_ratio = this.formRef.current.getFieldValue('divide_ratio')

        if (!this.isEdit) {

            addLevelType({
                level_type_name,
                divide_ratio
            }).then(() => {
                Util.success("操作成功")
                this.close()
                this.getList()
            }).catch(err => {
                Util.error(err)
            })
        } else {


            updateLevelType({
                level_type_id,
                level_type_name,
                divide_ratio
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

                deleteLevelType({
                    level_type_id: row.level_type_id
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
                    render: (text, row, index) => {
                        return index + 1;
                    }
                },
            {
                title: '咨询师等级类型',
                dataIndex: 'level_type_name',
            },
            {
                title: '分成比例（%）',
                dataIndex: 'divide_ratio',
            },
                {
                    title: '操作',
                    dataIndex: 'action',
                    render: (text, row) => {
                        return (
                            <Space size="middle">
                                <Button size={"small"} type={"primary"} onClick={this.edit.bind(this, row)}>编辑</Button>
                                <Button size={"small"} type={"primary"} danger onClick={this.delete.bind(this, row)}>删除</Button>
                            </Space>
                        )


                    }
                }
            ]
        ;


        return (

            <div>

                <Modal
                    title="咨询师等级类型"
                    visible={this.state.visible}
                    onOk={this.modalOnOk}
                    onCancel={this.close}
                >
                    <Form ref={this.formRef}
                          labelCol={{span: 6}}
                          onFinish={this.addOrUpdate}

                    >
                        <Form.Item name={'level_type_name'} label={'咨询师等级类型'} rules={[
                            {
                                required: true,
                                message: '咨询师等级类型不能为空!',
                            },
                        ]}>
                            <Input placeholder='请输入咨询师等级类型'></Input>
                        </Form.Item>

                        <Form.Item name={'divide_ratio'} label={'分成比例（%）'} rules={[
                            {
                                required: true,
                                message: '分成比例不能为空!',
                            },
                        ]}>
                            <InputNumber
                                min={0}
                                max={100}
                                precision={2}
                                step={0.01}
                                // onChange={onChange}
                            />
                        </Form.Item>

                    </Form>
                </Modal>


                <Row>
                    <Col span={22}>
                        <h3>咨询师等级类型管理</h3>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={this.add}>新增</Button>
                    </Col>
                </Row>
                <Divider/>
                <Row justify={'center'}>
                    <Col span={24}>
                        <Table dataSource={this.state.data} columns={columns} rowKey="level_type_id"
                               pagination={false}/>
                    </Col>
                </Row>
            </div>
        )

    }
}

export default Index;