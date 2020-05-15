import React, {Component} from 'react';
import {Button, Col, Divider, message, Pagination, Row, Space, Table} from "antd";
import Util from "../../../assets/js/Util";
import {getEthicsnoticeList, deleteEthicsnotice} from "../../../http/service";


class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                data: []
            }

        }
    }

    componentDidMount() {
        this.getList(1)
    }


    getList = (page) => {

        page = page || 1;

        let pageSize = Util.pageSize
        pageSize = 2;

        getEthicsnoticeList({
            page,
            pageSize,
        }).then((data) => {

            this.setState({
                data: data
            })

        }).catch(err => {
            Util.error(err)
        })


    }


    add = () => {
        this.props.history.push('/ethicsNotice/operate')
    }
    edit = (row) => {
        this.props.history.push({
            pathname: '/ethicsNotice/operate',
            state: {
                opType: 'edit',
                formItem: row
            }
        })
    }
    delete = (ethicsnotice_id) => {


        Util.confirm({
            title: '您确认删除吗？',
            content: '',
            onOk: () => {

                deleteEthicsnotice({
                    ethicsnotice_id
                }).then(data=>{
                    Util.success("删除成功")
                    this.getList()
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
                title: '咨询师姓名',
                dataIndex: 'name',
            },
            {
                title: '添加时间',
                dataIndex: 'add_date',
            },
            {
                title: '显示方式',
                dataIndex: 'showManner',
                render: (text) => {
                    return text === '0' ? '不显示' : text === '1' ? '永久显示' : '一段时间显示'
                }
            },
            {
                title: '显示截止日期',
                dataIndex: 'end_date',
                render: (text) => {

                    return text?text.split(' ')[0]:text;
                }
            },
            {
                title: '公告内容',
                dataIndex: 'content',
                width:'20em',
                ellipsis:true
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Space size="middle">
                        <Button size={"small"} type={"primary"} onClick={this.edit.bind(this, row)}>编辑</Button>
                        <Button size={"small"} type={"primary"} danger
                                onClick={this.delete.bind(this, row.ethicsnotice_id)}>删除</Button>
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
                        <Table dataSource={this.state.data.data} columns={columns} rowKey="ethicsnotice_id" pagination={false}/>
                        {
                            this.state.data.count > 0
                                ?
                                (<Pagination showQuickJumper
                                             total={this.state.data.count}
                                             pageSize={this.state.data.pageSize}
                                             current={this.state.data.currentPage}
                                             onChange={this.getList}/>)
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