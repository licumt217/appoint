import React, {Component} from 'react';

import Util from "../../../assets/js/Util";
import Role from "../../../assets/js/Role";

import {getDivisionAdminList, deleteDivisionAdmin} from "../../../http/service";
import {Button, Col, Row, Divider, Table, Space,Pagination} from "antd";


class Index extends Component {

    constructor(props) {

        super(props);
        this.division_id = this.props.location.state.division_id

        this.state={
            data:{
                data:[]
            }
        }
    }

    componentDidMount() {
        this.getList(1)
    }


    back = () => {
        this.props.history.push('/division/list')
    }

    getList = (page) => {


        page = page || 1;

        let pageSize = Util.pageSize

        getDivisionAdminList({
            role: Role.divisionManager,
            division_id: this.division_id,
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
            pathname: "/division/adminOperate",
            state: {
                division_id: this.division_id
            }
        })
    }
    edit = (formItem) => {


        this.props.history.push({
            pathname: "/division/adminOperate",
            state: {
                division_id: this.division_id,
                formItem,
                opType: 'edit'
            }
        })
    }
    delete = (user_id) => {

        Util.confirm({
            title: '您确认删除吗？',
            content: '',
            onOk: () => {

                deleteDivisionAdmin({
                    user_id,
                    division_id: this.division_id
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
                        <Button size={"small"} type={"primary"} danger onClick={this.delete.bind(this,row.user_id)}>删除</Button>
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Row>
                    <Col span={20}>
                        <h3>分部管理员</h3>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={this.add}>新增</Button>
                    </Col>
                    <Col span={2}>
                        <Button type={"default"} onClick={this.back}>返回</Button>
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