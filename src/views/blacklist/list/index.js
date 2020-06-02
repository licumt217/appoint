import React, {Component} from 'react';
import {Button, Col, Divider, Pagination, Row, Space, Table} from "antd";
import Util from "../../../assets/js/Util";
import {getBlackList,deleteBlacklist} from "../../../http/service";


class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],

        }
    }

    componentDidMount() {
        this.getList(1)
    }


    getList = (page) => {
        page=page||1;

        getBlackList({
            page,
            pageSize:Util.pageSize
        }).then(data=>{
            this.setState({
                data: data,
                count: data.length
            })
        })

    }


    delete = (blacklist_id) => {


        Util.confirm({
            title: '您确认移除吗？',
            content: '',
            onOk: () => {

                deleteBlacklist({
                    blacklist_id
                }).then(()=>{
                    Util.success("移除成功")
                    this.getList()
                }).catch(err=>{
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
                render: (text, row, index) => {
                    return index + 1;
                }
            },
            {
                title: '用户姓名',
                dataIndex: 'name',
            },
            {
                title: '用户手机号',
                dataIndex: 'phone',
            },
            {
                title: '添加黑名单时间',
                dataIndex: 'add_date',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Button size={"small"} type={"primary"} danger
                            onClick={this.delete.bind(this, row.blacklist_id)}>移除黑名单</Button>

                ),
            },
        ];


        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>用户黑名单列表</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row justify={'center'}>
                    <Col span={24}>
                        <Table dataSource={this.state.data.data} columns={columns} rowKey="user_id" pagination={false}/>
                        {
                            this.state.data.count > 0
                                ?
                                (<Pagination showQuickJumper total={this.state.data.count} onChange={this.getList}/>)
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