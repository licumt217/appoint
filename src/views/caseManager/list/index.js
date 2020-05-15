import React, {Component} from 'react';

import {Row, Col, Button, Table, Space, message, Modal, Divider, Pagination} from "antd";

import Util from "../../../assets/js/Util";

import Role from "../../../assets/js/Role";

import {getCasemanagerList,deleteCasemanager} from "../../../http/service";

class Index extends Component {

    constructor(props) {
        super(props);
        this.station_id=this.props.location.state.station_id
        this.station_name=this.props.location.state.station_name
        this.state={
            data:{
                data:[]
            }
        }
    }

    componentDidMount() {
        this.getList(1)
    }

    back=()=>{
        this.props.history.goBack()
    }

    getList=(page)=> {

        page=page||1;

        let pageSize=Util.pageSize
        pageSize=2;

        getCasemanagerList( {
            role:Role.caseManager,
            page,
            pageSize,
            station_id:this.station_id
        }).then((data) => {

            this.setState({
                data:data
            })

        }).catch(err => {
            message.warning(err)
        })
    }
    add=()=> {
        this.props.history.push({
            pathname:'/caseManager/operate',
            state:{
                station_id:this.station_id
            }
        })
    }
    edit=(row)=>{

        this.props.history.push({
            pathname:'/caseManager/operate',
            state:{
                opType:'edit',
                formItem:row,
                station_id:this.station_id
            }
        })
    }
    delete=(casemanager_id)=>{

        Util.confirm({
            title:'您确认删除吗？',
            onOk:()=>{
                deleteCasemanager({
                    casemanager_id,
                    station_id:this.station_id
                }).then(()=>{
                    message.success("删除成功")
                    this.getList()
                }).catch(err=>{
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
                render:(text,row,index)=>{
                    return index+1;
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
                    return text==='male'?'男':'女'
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
                        <Button type={"primary"} onClick={this.edit.bind(this,row)}>编辑</Button>
                        <Button type={"primary"} danger onClick={this.delete.bind(this,row.user_id)}>删除</Button>
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Row>
                    <Col span={20}>
                        <h3>{this.station_name} / 案例管理员管理</h3>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={this.add}>新增</Button>
                    </Col>
                    <Col span={2}>
                        <Button type={"default"} onClick={this.back}>返回</Button>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <Table dataSource={this.state.data.data} columns={columns} rowKey="user_id" pagination={false}/>
                        {
                            this.state.data.count > 0
                                ?
                                (<Pagination showQuickJumper total={this.state.data.count} pageSize={this.state.data.pageSize} current={this.state.data.currentPage} onChange={this.getList}/>)
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