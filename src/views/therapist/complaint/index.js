import React, {Component} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, Pagination, Row, Modal, Space, Table} from "antd";
import Util from "../../../assets/js/Util";
import {getTherapistComplaintsByTId} from "../../../http/service";
import Complaint_STATE from "../../../assets/js/constants/Complaint_STATE";
import store from "../../../store";

class Index extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.therapist_id=store.getState().user_id;

        this.state = {
            data: {
                data:[]
            },
            visible: false,
            reportContent: '',
            form: {},

        }
    }

    componentDidMount() {
        this.getList()
    }


    getList = () => {
        getTherapistComplaintsByTId(
            {
                therapist_id:this.therapist_id
            }
        ).then(data => {
            this.setState({
                data: data,
            })
        }).catch(err => {
            Util.error(err)
        })


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
                    title: '投诉时间',
                    dataIndex: 'complaint_date',
                },
                {
                    title: '投诉内容',
                    dataIndex: 'content',
                },
                {
                    title: '状态',
                    dataIndex: 'state',
                    render: (text) => {
                        return text === Complaint_STATE.UNHANDLED ? '未处理' : text === Complaint_STATE.REJECTED ? '已驳回' : '已添加黑名单'
                    }
                },
            ]
        ;


        return (

            <div>

                <Row>
                    <Col span={22}>
                        <h3>我的投诉列表</h3>
                    </Col>
                </Row>
                <Divider/>

                <Row justify={'center'}>
                    <Col span={24}>
                        <Table dataSource={this.state.data.data} columns={columns} rowKey="complaint_id" pagination={false}/>
                        {
                            this.state.data.data.length>0?
                                <Pagination showQuickJumper total={this.state.data.count} onChange={this.getList} />
                                :null
                        }
                    </Col>
                </Row>
            </div>
        )
            ;
    }
}

export default Index;