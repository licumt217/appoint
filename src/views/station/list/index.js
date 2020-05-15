import React, {Component} from 'react';

import {Row, Col, Button, Table, Space, message, Modal, Divider, Pagination} from "antd";

import Util from "../../../assets/js/Util";

import Role from "../../../assets/js/Role";

import {getStationList,deleteStation} from "../../../http/service";

class Index extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getList(1)
    }


    getList = (page) => {

        page = page || 1;

        let pageSize = Util.pageSize

        getStationList({
            role: Role.divisionManager,
            page,
            pageSize

        }).then((data) => {

            this.setState({
                data: data
            })

        }).catch(err => {
            message.warning(err)
        })
    }
    add = () => {
        this.props.history.push('/station/operate')
    }
    adminList = (division_id) => {

        this.props.history.push({
            pathname: '/division/adminList',
            state: {
                division_id
            }
        })
    }
    edit = (row) => {

        this.props.history.push({
            pathname: '/station/operate',
            state: {
                opType: 'edit',
                formItem: row
            }
        })
    }
    delete = (station_id) => {

        Util.confirm({
            title: '您确认删除吗？',
            onOk: () => {
                deleteStation({
                    station_id
                }).then(()=>{
                    message.success("删除成功")
                    this.getList()
                }).catch(err=>{
                    message.warning(err)
                })
            }
        })

    }

    go2CaseManagerList = (row) => {
        this.props.history.push({
            pathname:'/caseManager/list',
            state:{
                station_id:row.station_id,
                station_name:row.station_name,
            }
        })
    }

    go2TherapistList = (row) => {
        this.props.history.push({
            pathname:'/station/relateTherapist',
            state:{
                station_id:row.station_id,
                station_name:row.station_name,
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
                title: '工作室名称',
                dataIndex: 'station_name',
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
            {
                title: '联系方式',
                dataIndex: 'phone',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Space size="middle">
                        <Button size={"small"} type={"primary"} onClick={this.edit.bind(this, row)}>编辑</Button>
                        <Button size={"small"} type={"primary"} danger
                                onClick={this.delete.bind(this, row.station_id)}>删除</Button>
                        <Button size={"small"} type={"primary"}
                                onClick={this.go2CaseManagerList.bind(this, row)}>案例管理员</Button>
                        <Button size={"small"} type={"primary"}
                                onClick={this.go2TherapistList.bind(this, row)}>咨询师列表</Button>
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>工作室管理</h3>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={this.add}>新增</Button>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <Table dataSource={this.state.data} columns={columns} rowKey="station_id" pagination={false}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;