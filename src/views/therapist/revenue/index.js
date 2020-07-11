import React, {Component} from 'react';

import Util from "../../../assets/js/Util";
import Role from "../../../assets/js/Role";

import {getDoneOrderList, getRevenueSum} from "../../../http/service";
import {Statistic, Col, Row, Divider, Table, Space, Pagination, Form, Input, Modal} from "antd";
import store from "../../../store";
import ORDER_STATE_DESC from "../../../assets/js/constants/ORDER_STATE_DESC";
import ORDER_STATE from "../../../assets/js/constants/ORDER_STATE";


class Index extends Component {
    modalRef = React.createRef();
    constructor(props) {

        super(props);

        this.therapist_id=store.getState().user_id;
        this.currentRow={}

        this.state={
            visible: false,
            data:{
                data:[]
            },
            revenue:{}
        }
    }

    componentDidMount() {
        this.getRevenueSum();
        this.getList(1)
    }


    /**
     * 汇总类收益
     */
    getRevenueSum=()=>{
        getRevenueSum({

        }).then((data) => {

            this.setState({
                revenue:data
            })


        }).catch(err => {
            Util.error(err)
        })
    }

    getList = (page) => {


        page = page || 1;

        let pageSize = Util.pageSize

        getDoneOrderList({
            page,
            pageSize

        }).then((data) => {

            this.setState({
                data:data
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
                render:(text,row,index)=>{
                    return `${(this.state.data.currentPage-1)*(this.state.data.pageSize)+(index+1)}`
                }
            },
            {
                title: '客户姓名',
                dataIndex: 'name',
            },
            {
                title: '客户手机号',
                dataIndex: 'phone',
            },
            {
                title: '订单日期',
                dataIndex: 'order_date',
                render:(text)=>{
                    return text?(text.split(' ')[0]):text;
                }
            },
            {
                title: '订单时段',
                dataIndex: 'period',
                render:(text)=>{
                    return Util.getAppointmentPeriodStr(text)
                }
            },
            {
                title: '订单金额',
                dataIndex: 'amount',
            },
            {
                title: '订单状态',
                dataIndex: 'state',
                render:(text)=>{
                    return ORDER_STATE_DESC[text]
                }
            },

        ];

        return (
            <div>
                <Row>
                    <Col span={20}>
                        <h3>我的收益</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row >
                    <Col span={8}>
                        <Statistic title="总收益" value={this.state.revenue.allAmount} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="本月收益" value={this.state.revenue.monthAmount} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="本周收益" value={this.state.revenue.weekAmount} />
                    </Col>
                </Row>
                <Divider/>
                <Row justify={'center'}>
                    <Col span={24}>
                        <Table dataSource={this.state.data.data} columns={columns} rowKey="user_id" pagination={false} />
                        {
                            this.state.data.data.length>0?
                                <Pagination showQuickJumper total={this.state.data.count} onChange={this.getList} />
                                :null
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;
