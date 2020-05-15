import React, {Component} from 'react';

import {Row, Col, Button, Table, Space, message, Modal, Divider, Pagination, Form, Input} from "antd";

import Util from "../../../assets/js/Util";

import {getRelateTherapistList,deleteRelateTherapist} from "../../../http/service";

import TherapistList from './components/TherapistList'
class Index extends Component {

    constructor(props) {
        super(props);
        this.station_id = this.props.location.state.station_id
        this.state = {
            data: {
                data: []
            },
            visible: false
        }
    }

    componentDidMount() {
        this.getList(1)
    }


    getList = (page) => {

        page = page || 1;

        let pageSize = Util.pageSize

        getRelateTherapistList({
            page,
            pageSize,
            station_id: this.station_id

        }).then((data) => {

            if (data) {
                this.setState({
                    data: data
                })
            }

        }).catch(err => {
            message.warning(err)
        })
    }
    open = () => {
        this.setState({
            visible: true
        })
    }
    back = () => {

        this.props.history.goBack()
    }

    close = () => {

        this.setState({
            visible:false
        })

        this.getList()
    }

    remove = (therapist_id) => {

        Util.confirm({
            title: '您确认移除吗？',
            onOk: () => {
                deleteRelateTherapist({
                    station_id: this.station_id,
                    therapist_id
                }).then(() => {
                    message.success("移除成功")
                    this.getList()
                }).catch(err => {
                    message.warning(err)
                })
            }
        })

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
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '手机号',
                dataIndex: 'phone',
            },
            {
                title: '性别',
                dataIndex: 'gender',
                render: (text) => {
                    return text === 'male' ? '男' : '女'
                }
            },
            {
                title: '电子邮箱',
                dataIndex: 'email',
            },
            {
                title: '出生日期',
                dataIndex: 'birthday',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Space size="middle">
                        <Button size={"small"} type={"primary"} danger
                                onClick={this.remove.bind(this, row.user_id)}>移除</Button>
                    </Space>
                ),
            },
        ];


        return (
            <div>

                <TherapistList visible={this.state.visible} station_id={this.station_id} onClose={this.close}/>


                <Row>
                    <Col span={22}>
                        <h3>咨询师列表</h3>
                    </Col>
                    <Col span={2}>
                        <Space>
                            <Button type={"primary"} onClick={this.open}>新增</Button>
                            <Button type={"primary"} onClick={this.back}>返回</Button>
                        </Space>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <Table dataSource={this.state.data.data} columns={columns} rowKey="phone"
                               pagination={false}/>
                        {
                            this.state.data.count > 0
                                ?
                                (<Pagination showQuickJumper total={this.state.data.count}
                                             pageSize={this.state.data.pageSize} current={this.state.data.currentPage}
                                             onChange={this.getList}/>)
                                :
                                (null)
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;