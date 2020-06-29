import React, {Component} from 'react';

import {Row,Col,Button,Table,Space,message,Modal,Divider} from "antd";

import Util from "../../../assets/js/Util";

import Role from "../../../assets/js/Role";

import {getMeasureList,deleteDivision} from "../../../http/service";

import store from "../../../store";

class Index extends Component {

    constructor() {
        super();
        this.state={
            dataList:[],
            isAdd:false
        }
    }

    componentDidMount() {
        this.getList(1)
    }


    getList=(page)=> {

        page=page||1;

        let pageSize=Util.pageSize

        getMeasureList( {
        }).then((data) => {

            debugger

            if(data&&data.data.length>0){
                this.setState({
                    dataList:data.data
                })

            }else{
                this.setState({
                    isAdd:true
                })
            }
            if(data.roleData&&data.roleData.length>0){

                let list=this.state.dataList;
                list.unshift(data.roleData[0])
                this.setState({
                    dataList:list
                })
            }



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
    detail=(row)=>{

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
            },
            {
                title: '创建时间',
                dataIndex: 'createtime',
            },
            {
                title: '是否公用',
                dataIndex: 'role',
                render:(role)=>{
                    return role===0?'是':'否';
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                render:(status)=>{
                    return status===1?'已完成':'未完成';
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Space size="middle">
                        {
                            store.getState().role===row.role?
                                <React.Fragment>
                                    <Button type={"primary"} size={"small"} onClick={this.edit.bind(this,row.division_id)}>修改名称</Button>
                                    <Button type={"primary"} size={"small"} danger onClick={this.delete.bind(this,row.division_id)}>删除</Button>
                                    <Button type={"primary"} size={"small"} onClick={this.detail.bind(this,row.division_id)}>编辑</Button>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Button type={"primary"} size={"small"} onClick={this.detail.bind(this,row.division_id)}>查看</Button>
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
                        this.state.isAdd?
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
                        <Table dataSource={this.state.datalist} columns={columns} rowKey="division_id" pagination={false}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;