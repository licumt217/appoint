import React, {Component} from 'react';

import Util from "../../../assets/js/Util";
import Role from "../../../assets/js/Role";

import {getOrderListByDivisionAdminId, addComplaint, deleteLevelType,refund} from "../../../http/service";
import {Button, Col, Row, Divider, Table, Space, Pagination, Form, Input, Modal} from "antd";
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
            }
        }
    }

    componentDidMount() {
        this.getList(1)
    }



    getList = (page) => {


        page = page || 1;

        let pageSize = Util.pageSize

        getOrderListByDivisionAdminId({
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

    close=()=>{
        this.setState({
            visible:false,
        })
    }

    check = () => {

        this.modalRef.current.submit();


    }

    realComplain=(form)=>{
        addComplaint({
            order_id:this.currentRow.order_id,
            content:form.content
        }).then(data => {
            Util.success(`投诉成功！`)
            this.close()
            this.getList(this.state.data.currentPage)
        }).catch(err => {
            Util.error(err)
        })
    }

    refund=(row)=>{
        Util.confirm({
            title: '您确认退款吗？',
            content: '',
            onOk: () => {

                refund({
                    order_id: row.order_id
                }).then(() => {
                    Util.success("已退款")
                    this.getList()
                }).catch(err => {
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
                title: '订单金额',
                dataIndex: 'amount',
            },
            {
                title: '预约时段',
                dataIndex: 'period',
                render:(text)=>{
                    return Util.getAppointmentPeriodStr(text)
                }
            },
            {
                title: '房间',
                dataIndex: 'room_name',
            },
            {
                title: '订单状态',
                dataIndex: 'state',
                render:(text)=>{
                    return ORDER_STATE_DESC[text]
                }
            },


            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => {

                    if(row.state===ORDER_STATE.DONE || row.state===ORDER_STATE.PAYED){
                        return (
                            <Space size="middle">
                                <Button size={"small"} type={"warning"} danger
                                        onClick={this.refund.bind(this, row)}>退款</Button>
                            </Space>
                        )
                    }else{
                        return null;
                    }



                }
            }
        ];

        return (
            <div>
                <Modal
                    title="投诉客户"
                    visible={this.state.visible}
                    onOk={this.check}
                    onCancel={this.close}
                >
                    <Form ref={this.modalRef}
                          onFinish={this.realComplain}

                    >
                        <Form.Item name={'content'} rules={[
                            {
                                required: true,
                                message: '投诉内容不能为空!',
                            },
                        ]}>
                            <Input.TextArea rows={5} placeholder={'请输入投诉内容'}></Input.TextArea>
                        </Form.Item>
                    </Form>
                </Modal>

                <Row>
                    <Col span={20}>
                        <h3>咨询客观记录</h3>
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