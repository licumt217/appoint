import React, {Component} from 'react';

import {Row, Col, Button, Table, Space, message, Modal, Divider, Pagination} from "antd";

import Util from "../../../assets/js/Util";

import Role from "../../../assets/js/Role";

import {deleteRoom,getRoomList,onOffRoom} from "../../../http/service";

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


    getList=(page)=> {

        page=page||1;

        let pageSize=Util.pageSize
        pageSize=2;

        getRoomList( {
            page,
            pageSize,
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
            pathname:'/room/operate',
            state:{
                // station_id:this.station_id
            }
        })
    }
    edit=(row)=>{

        this.props.history.push({
            pathname:'/room/operate',
            state:{
                opType:'edit',
                formItem:row,
            }
        })
    }

    occupy=(room_id)=> {
        this.props.history.push({
            pathname:'/room/occupy',
            state:{
                room_id
            }
        })
    }

    go2UseablePeriodSet=()=>{
        this.props.history.push({
            pathname:'/room/periodSet',
            state:{
            }
        })
    }

    onOff=(row)=> {

        let url = 'appoint_wx/room/onOff';

        onOffRoom(row).then(() => {

            Util.success("操作成功！")
            this.getList()


        }).catch(err => {
            Util.error(err)
        })


    }
    delete=(room_id)=>{

        Util.confirm({
            title:'您确认删除吗？',
            onOk:()=>{
                deleteRoom({
                    room_id,
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
                    return `${(this.state.data.currentPage-1)*(this.state.data.pageSize)+(index+1)}`
                }
            },
            {
                title: '房间名',
                dataIndex: 'name',
            },
            {
                title: '房间位置',
                dataIndex: 'position',
            },
            {
                title: '状态',
                dataIndex: 'state',
                render:(text)=>{
                    return text===0?'已启用':'已停用'
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Space size="middle">
                        <Button size={"small"} type={"primary"} onClick={this.edit.bind(this,row)}>编辑</Button>
                        <Button size={"small"} type={"primary"} danger onClick={this.delete.bind(this,row.room_id)}>删除</Button>
                        <Button size={"small"} type={"primary"} onClick={this.occupy.bind(this,row.room_id)}>使用率</Button>
                        {
                            row.state===0?
                                (
                                    <Button size={"small"} type={"primary"} danger onClick={this.onOff.bind(this,row)}>停用</Button>
                                )
                                :
                                (
                                    <Button size={"small"} type={"primary"} onClick={this.onOff.bind(this,row)}>启用</Button>
                                )
                        }
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Row>
                    <Col span={20}>
                        <h3>房间管理</h3>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={this.add}>新增</Button>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={this.go2UseablePeriodSet}>可用时段设置</Button>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <Table dataSource={this.state.data.data} columns={columns} rowKey="room_id" pagination={false}/>
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