import React, {Component} from 'react';

import {Row, Col, Button, Table, Space, message, Modal, Divider, Pagination} from "antd";

import Util from "../../../assets/js/Util";

import Role from "../../../assets/js/Role";

import {getUserList,deleteUser} from "../../../http/service";

class Index extends Component {

    constructor() {
        super();
        this.state={
            data:{
                data:[]
            }
        }
    }

    componentDidMount() {
        this.getList(1)
    }


    getList=(page)=> {


    }
    detail=(row)=>{

        this.props.history.push({
            pathname:'/preCheck/operate',
            state:{
                opType:'edit',
                formItem:row
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
                title: '答题时间',
                dataIndex: 'answerDate',
            },
            {
                title: '状态',
                dataIndex: 'state',
                render:(text)=>{
                    return text==='0'?'未答题':'已答题'
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Space size="middle">
                        <Button type={"primary"} onClick={this.detail.bind(this,row)}>查看详情</Button>
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>预检表管理</h3>
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