import React, {Component} from 'react';

import {Row, Col, Button, Table, Space, message, Modal, Divider, Pagination, Form, Input} from "antd";

import Util from "../../../../../assets/js/Util";

import Role from "../../../../../assets/js/Role";

import { getNotRelatedTherapist, addRelateTherapist} from "../../../../../http/service";

class Index extends Component {

    constructor(props) {
        super(props);
        this.station_id = this.props.station_id
        this.state = {
            data: {
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
            this.getNotRelatedTherapist(1)
        }
    }


    getNotRelatedTherapist = (page) => {

        page = page || 1;

        let pageSize = Util.pageSize

        pageSize = 3

        getNotRelatedTherapist({
            page,
            pageSize,
        }).then((data) => {

            if (data) {
                this.setState({
                    data
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
        }).then(() => {

            Util.success('已关联！')
            this.getNotRelatedTherapist();

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
                    return `${(this.state.data.currentPage-1)*(this.state.data.pageSize)+(index+1)}`
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
                    <Table dataSource={this.state.data.data} columns={allColumns} rowKey='user_id'
                           pagination={false}/>
                    {
                        this.state.data.count > 0
                            ?
                            (<Pagination showQuickJumper total={this.state.data.count}
                                         pageSize={this.state.data.pageSize}
                                         current={this.state.data.currentPage}
                                         onChange={this.getNotRelatedTherapist}/>)
                            :
                            (null)
                    }
                </Modal>



            </div>
        );
    }
}

export default Index;