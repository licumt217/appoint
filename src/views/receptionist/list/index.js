import React, {Component} from 'react';

import Util from "../../../assets/js/Util";
import Role from "../../../assets/js/Role";

import {getReceptionistList, deleteReceptionist} from "../../../http/service";
import {Button, Col, Row, Divider, Table, Space,Pagination} from "antd";


class Index extends Component {

    constructor(props) {

        super(props);

        this.state={
            data:{
                data:[]
            }
        }
    }

    componentDidMount() {
        this.getList(1)
    }


    getList = (page) => {


        page = page || 1;

        let pageSize = Util.pageSize

        getReceptionistList({
            page,
            pageSize

        }).then((data) => {

            this.setState({
                data:data
            })


        }).catch(err => {
            Util.error(err)
        })
    }
    add = () => {

        this.props.history.push({
            pathname: "/receptionist/operate",
            state: {
                division_id: this.division_id
            }
        })
    }
    edit = (formItem) => {


        this.props.history.push({
            pathname: "/receptionist/operate",
            state: {
                division_id: this.division_id,
                formItem,
                opType: 'edit'
            }
        })
    }
    delete = (row) => {

        Util.confirm({
            title: '您确认删除吗？',
            content: '',
            onOk: () => {

                deleteReceptionist({
                    user_id:row.user_id,
                    station_receptionist_id: row.station_receptionist_id
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
                    return `${(this.state.data.currentPage-1)*(this.state.data.pageSize)+(index+1)}`
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
                render:(text)=>{
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
                        <Button size={"small"} type={"primary"} onClick={this.edit.bind(this,row)}>编辑</Button>
                        <Button size={"small"} type={"primary"} danger onClick={this.delete.bind(this,row)}>删除</Button>
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Row>
                    <Col span={20}>
                        <h3>接待员管理</h3>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={this.add}>新增</Button>
                    </Col>
                </Row>
                <Divider/>
                <Row justify={'center'}>
                    <Col span={24}>
                        <Table dataSource={this.state.data.data} columns={columns} rowKey="user_id" pagination={false} />
                        <Pagination showQuickJumper total={this.state.data.count} onChange={this.getList} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;