import React, {Component} from 'react';
import {Button, Col, Divider, Pagination, Row, Space, Table} from "antd";
import Util from "../../../assets/js/Util";


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


    getList = (currentPage) => {

        let data = []

        if (data) {

            this.setState({
                data: data,
                count: data.length
            })
        }


    }


    delete = (id) => {


        Util.confirm({
            title: '您确认删除吗？',
            content: '',
            onOk: () => {

                Util.success("删除成功")
                this.getList()
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
                dataIndex: 'userName',
            },
            {
                title: '用户手机号',
                dataIndex: 'userPhone',
            },
            {
                title: '添加黑名单时间',
                dataIndex: 'addDate',
            },
            {
                title: '移除黑名单时间',
                dataIndex: 'removeDate',
                render: (text) => {
                    return text || ''
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    row.state === '0'
                        ?
                        <Button size={"small"} type={"primary"} danger
                                onClick={this.delete.bind(this, row.id)}>移除黑名单</Button>
                        :
                        <span>已移除</span>

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