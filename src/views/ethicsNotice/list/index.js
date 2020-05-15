import React, {Component} from 'react';
import {Button, Col, Divider, Pagination, Row, Space, Table} from "antd";
import Util from "../../../assets/js/Util";
import {EthicsNotice} from "../EthicsNotice";


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


    pageChange = (page) => {
        this.getList(page)
    }
    getList = (currentPage) => {

        let data = EthicsNotice.getList();

        if (data) {

            this.setState({
                data: data,
                count: data.length
            })
        }


    }


    add = () => {
        this.props.history.push('/ethicsNotice/operate')
    }
    edit = (row) => {
        this.props.history.push({
            pathname:'/ethicsNotice/operate',
            state:{
                opType: 'edit',
                formItem: row
            }
        })
    }
    delete = (id) => {


        Util.confirm({
            title: '您确认删除吗？',
            content: '',
            onOk: () => {

                EthicsNotice.delete(id)
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
                title: '咨询师姓名',
                dataIndex: 'therapistId',
            },
            {
                title: '添加时间',
                dataIndex: 'addDate',
            },
            {
                title: '显示方式',
                dataIndex: 'showManner',
                render: (text) => {
                    return text === '0' ? '不显示' : text === '1' ? '永久显示' : '一段时间显示'
                }
            },
            {
                title: '截止时间',
                dataIndex: 'endDate',
                render: (text) => {

                    if (!text) {
                        return ''
                    } else {
                        let date = new Date(text);
                        return date.toLocaleString
                    }
                }
            },
            {
                title: '公告内容',
                dataIndex: 'content',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Space size="middle">
                        <Button size={"small"} type={"primary"} onClick={this.edit.bind(this, row)}>编辑</Button>
                        <Button size={"small"} type={"primary"} danger
                                onClick={this.delete.bind(this, row.id)}>删除</Button>
                    </Space>
                ),
            },
        ];


        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>伦理公告列表</h3>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={this.add}>新增</Button>
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