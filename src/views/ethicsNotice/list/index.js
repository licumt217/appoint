import React, {Component} from 'react';
import {Button, Col, Divider, message, Pagination, Row, Space, Table} from "antd";
import Util from "../../../assets/js/Util";
import {getEthicsnoticeList, deleteEthicsnotice,onOffEthicsnotice} from "../../../http/service";
import warning from "react-redux/lib/utils/warning";


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
    onOff=(row)=>{
        onOffEthicsnotice({
            ethicsnotice_id:row.ethicsnotice_id,
            state:row.state===0?1:0
        }).then(data=>{
            Util.success("操作成功")
            this.getList()
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
                width:'5em',
                render:(text,row,index)=>{
                    return `${(this.state.data.currentPage-1)*(this.state.data.pageSize)+(index+1)}`
                }
            },
            {
                title: '咨询师姓名',
                width:'8em',
                dataIndex: 'name',
            },
            {
                title: '添加时间',
                width:'8em',
                dataIndex: 'add_date',
            },
            {
                title: '显示方式',
                dataIndex: 'showManner',
                width:'8em',
                render: (text) => {
                    return text === '0' ? '不显示' : text === '1' ? '永久显示' : '一段时间显示'
                }
            },
            {
                title: '显示截止日期',
                dataIndex: 'end_date',
                width:'8em',
                render: (text) => {

                    return text?text.split(' ')[0]:text;
                }
            },
            {
                title: '公告内容',
                dataIndex: 'content',
                width:'15em',
                ellipsis:true
            },
            {
                title: '状态',
                dataIndex: 'state',
                width:'4em',
                render:(state)=>{
                    return state===0?'启用':'停用'
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                width:'20em',
                render: (text, row) => (
                    <Space size="middle">
                        <Button size={"small"} type={"primary"} onClick={this.edit.bind(this, row)}>编辑</Button>
                        {
                            row.state===0?
                                <Button size={"small"} type={"primary"} danger onClick={this.onOff.bind(this, row)}>停用</Button>
                                :
                                <Button size={"small"} type={"primary"} onClick={this.onOff.bind(this, row)}>启用</Button>
                        }

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
