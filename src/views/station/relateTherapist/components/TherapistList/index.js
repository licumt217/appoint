import React, {Component} from 'react';

import {Row, Col, Button, Table, Space, message, Modal, Divider, Pagination, Form, Input} from "antd";

import Util from "../../../../../assets/js/Util";

import Role from "../../../../../assets/js/Role";

import { getUserList, addRelateTherapist} from "../../../../../http/service";

class Index extends Component {

    constructor(props) {
        super(props);
        this.station_id = this.props.station_id
        this.state = {
            therapistListData: {
                data: []
            },
            visible: false
        }
    }




    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.visible && !prevProps.visible){
            this.setState({
                visible:true
            })
            this.getAllList(1)
        }
    }


    getAllList = (page) => {

        page = page || 1;

        let pageSize = Util.pageSize

        pageSize = 3

        getUserList({
            page,
            pageSize,
            role: Role.therapist

        }).then((therapistListData) => {

            if (therapistListData) {
                this.setState({
                    therapistListData
                })
            }

        }).catch(err => {
            message.warning(err)
        })
    }

    close=()=>{
        this.setState({
            visible:false
        })
        this.props.onClose()
    }



    relate = (therapist_id) => {
        addRelateTherapist({
            station_id: this.station_id,
            therapist_id
        }).then((therapistListData) => {

            Util.success('关联成功！')

        }).catch(err => {
            message.warning(err)
        })

    }



    render() {


        const allColumns = [
            {
                title: '序号',
                dataIndex: 'index',
                render: (text, row, index) => {
                    return index + 1;
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
                render: (text) => {
                    return text === 'male' ? '男' : '女'
                }
            },
            {
                title: '电子邮箱',
                dataIndex: 'email',
            },
            {
                title: '出生日期',
                dataIndex: 'birthday',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Space size="middle">
                        <Button size={"small"} type={"primary"}
                                onClick={this.relate.bind(this, row.user_id)}>关联</Button>
                    </Space>
                ),
            },
        ];

        return (
            <div>

                <Modal
                    width='50vw'
                    visible={this.state.visible}
                    title="关联咨询师"
                    onCancel={()=>{
                        this.close()
                    }}
                    footer={[
                        <Button key={1} onClick={() => {
                            this.close()
                        }}>关闭</Button>
                    ]}
                >
                    <Table dataSource={this.state.therapistListData.data} columns={allColumns} rowKey='user_id'
                           pagination={false}/>
                    {
                        this.state.therapistListData.count > 0
                            ?
                            (<Pagination showQuickJumper total={this.state.therapistListData.count}
                                         pageSize={this.state.therapistListData.pageSize}
                                         current={this.state.therapistListData.currentPage}
                                         onChange={this.getAllList}/>)
                            :
                            (null)
                    }
                </Modal>



            </div>
        );
    }
}

export default Index;