import React, {Component} from 'react';

import {Row, Col, Button, Table, Space, Divider} from "antd";

import Util from "../../../assets/js/Util";

import {getMeasureList, deleteMeasure} from "../../../http/service";

import store from "../../../store";

import IS_MEASURE_PUBLIC from "../../../assets/js/constants/IS_MEASURE_PUBLIC";

class Index extends Component {

    constructor() {
        super();
        this.state = {
            dataList: [],
            isShowAddBtn: false
        }
    }

    componentDidMount() {
        this.getList()
    }


    getList = () => {

        getMeasureList().then((data) => {

            let isShowAddBtn=data.data.length === 0

            let list=data.data;

            if (data.roleData && data.roleData.length > 0) {

                list.unshift(data.roleData[0])

            }

            this.setState({
                dataList: list,
                isShowAddBtn
            })

        }).catch(err => {
            Util.warning(err)
        })
    }
    add = () => {
        this.props.history.push('/measure/operate')
    }
    edit = (row) => {

        this.props.history.push({
            pathname: '/measure/operate',
            state: {
                opType: 'edit',
                formItem: row
            }
        })
    }
    detail = (row) => {

        this.props.history.push({
            pathname: '/measure/detail',
            state: {
                measureId: row.id,
                user_id:row.user_id
            }
        })
    }
    delete = (id) => {

        Util.confirm({
            title: '您确认删除吗？',
            onOk: () => {
                deleteMeasure({
                    id
                }).then(() => {
                    Util.success("删除成功")
                    this.getList()
                }).catch(err => {
                    Util.warning(err)
                })
            }
        })

    }


    render() {

        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                width:'5em',
                render: (text, row, index) => {
                    return index + 1;
                }
            },
            {
                title: '量表名称',
                dataIndex: 'name',
            },
            {
                title: '量表别名',
                dataIndex: 'alias',
            },
            {
                title: '量表描述',
                dataIndex: 'description',
                ellipsis:true
            },
            {
                title: '创建时间',
                dataIndex: 'createtime',
                width:'14em',
                ellipsis:true
            },
            {
                title: '是否公用',
                dataIndex: 'role',
                width:'8em',
                render: (value) => {
                    return value === IS_MEASURE_PUBLIC.YES ? '是' : '否';
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Space size="middle">
                        {
                            store.getState().role === row.role ?
                                <React.Fragment>
                                    <Button type={"primary"} size={"small"}
                                            onClick={this.edit.bind(this, row)}>修改名称</Button>
                                    <Button type={"primary"} size={"small"} danger
                                            onClick={this.delete.bind(this, row.id)}>删除</Button>
                                    <Button type={"primary"} size={"small"}
                                            onClick={this.detail.bind(this, row)}>编辑</Button>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Button type={"primary"} size={"small"}
                                            onClick={this.detail.bind(this, row)}>查看</Button>
                                </React.Fragment>
                        }
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>量表管理</h3>
                    </Col>
                    {
                        this.state.isShowAddBtn ?
                            <Col span={2}>
                                <Button type={"primary"} onClick={this.add}>新增</Button>
                            </Col>
                            :
                            null
                    }
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <Table dataSource={this.state.dataList} columns={columns} rowKey="id" pagination={false}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;
