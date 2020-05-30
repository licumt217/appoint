import React, {Component} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, Pagination, Row, Modal, Space, Table} from "antd";
import Util from "../../../assets/js/Util";
import {getUserComplaints} from "../../../http/service";

const {RangePicker} = DatePicker;

class Index extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            reportContent: '',
            form: {}

        }
    }

    componentDidMount() {
        this.getList(1)
    }


    getList = (page) => {
        page = page || 1;

        let pageSize = Util.pageSize
        getUserComplaints(Object.assign({
            page,
            pageSize,

        }, this.state.form)).then(data => {
            this.setState({
                data: data,
            })
        }).catch(err => {
            Util.error(err)
        })


    }

    query = (form) => {

        let obj = Object.assign({}, this.state.form, form)
        if (obj.date) {
            obj.startDate = Util.getDateFromMoment(obj.date[0])
            obj.endDate = Util.getDateFromMoment(obj.date[1])+` 23:59:59`

        }else{
            obj.startDate =''
            obj.endDate = ''
        }

        this.setState({
            form: obj
        })


        this.getList()
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
                    title: '咨询师姓名',
                    dataIndex: 'therapist_name',
                },
                {
                    title: '咨询师手机号',
                    dataIndex: 'therapist_phone',
                },
                {
                    title: '投诉时间',
                    dataIndex: 'complaint_date',
                },
                {
                    title: '投诉内容',
                    dataIndex: 'content',
                },
            ]
        ;


        return (

            <div>

                <Row>
                    <Col span={22}>
                        <h3>用户投诉咨询师列表</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col>
                        <Form
                            ref={this.formRef}
                            layout="inline"
                            labelCol={{span: 10}}
                            wrapperCol={{span: 14}}
                            onFinish={this.query}
                        >

                            <Form.Item
                                label="用户姓名"
                                name="userName"
                            >
                                <Input placeholder={'请输入用户姓名'} maxLength={21}/>
                            </Form.Item>


                            <Form.Item
                                label="咨询师姓名"
                                name="therapistName"
                            >
                                <Input key={1} placeholder={'请输入咨询师姓名'} maxLength={11}/>
                            </Form.Item>


                            <Form.Item
                                label="投诉时间"
                                name="date"
                                format="YYYY-MM-DD"
                            >
                                <RangePicker style={{width:'20em'}}/>
                            </Form.Item>


                            <Form.Item wrapperCol={{offset: 8, span: 16}}>


                                <Button style={{width: '6em'}} type="primary" htmlType="submit">
                                    查询
                                </Button>
                            </Form.Item>
                        </Form>
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
        )
            ;
    }
}

export default Index;