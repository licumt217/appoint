import React, {Component} from 'react';

import {Row,Col,Button,Table,Space,message,Modal,Divider} from "antd";

import Util from "../../../assets/js/Util";

import Role from "../../../assets/js/Role";

import {getDivisionList,deleteDivision} from "../../../http/service";

class Index extends Component {

    constructor() {
        super();
        this.state={
            datalist:[]
        }
    }

    componentDidMount() {
        this.getList(1)
    }


    getList=(page)=> {

        page=page||1;

        let pageSize=Util.pageSize

        getDivisionList( {
            role:Role.divisionManager,
            page,
            pageSize

        }).then((data) => {

            this.setState({
                datalist:data
            })

        }).catch(err => {
            message.warning(err)
        })
    }
    add=()=> {
        this.props.history.push('/division/operate')
    }
    adminList=(division_id)=>{

        this.props.history.push({
            pathname:'/division/adminList',
            state:{
                division_id
            }
        })
    }
    edit=(row)=>{

        this.props.history.push({
            pathname:'/division/operate',
            state:{
                opType:'edit',
                formItem:row
            }
        })
    }
    delete=(division_id)=>{

        Util.confirm({
            title:'您确认删除吗？',
            onOk:()=>{
                deleteDivision({
                    division_id
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
                title: '分部名称',
                dataIndex: 'division_name',
            },
            {
                title: '功能等级',
                dataIndex: 'function_level',
                render:(text)=>{
                    let state=''
                    switch (text) {
                        case 0:
                            state='基础功能'
                            break;
                        case 1:
                            state='预约管理'
                            break;
                        case 2:
                            state='账单生成'
                            break;
                        case 3:
                            state='线上支付'
                            break;
                    }
                    return state;
                }
            },
            {
                title: '创建时间',
                dataIndex: 'create_date',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Space size="middle">
                        <Button type={"primary"} onClick={this.edit.bind(this,row)}>编辑</Button>
                        <Button type={"primary"} danger onClick={this.delete.bind(this,row.division_id)}>删除</Button>
                        <Button type={"primary"} onClick={this.adminList.bind(this,row.division_id)}>分部管理员</Button>
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>分部管理</h3>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={this.add}>新增</Button>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                   <Col span={24}>
                       <Table dataSource={this.state.datalist} columns={columns} rowKey="division_id" pagination={false}/>
                   </Col>
                </Row>
            </div>
        );
    }
}

export default Index;