import React, {Component} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, Pagination, Row, Modal, Space, Table, Select} from "antd";
import Util from "../../../../assets/js/Util";
import {getContinueEduPageList} from "../../../../http/service";

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
        getContinueEduPageList(Object.assign({
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

        if(form.year){
            form.year=String(Util.getRealDateFromMoment(form.year).getFullYear())
        }

        this.setState({
            form
        })


        this.getList()
    }

    detail=(row)=>{
        this.props.history.push({
            pathname:'/therapist/continueEdu/operate',
            state:{
                opType:'query',
                continue_edu_id:row.continue_edu_id
            }

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
                title: '咨询师',
                dataIndex: 'name',
            },
            {
                title: '年度',
                dataIndex: 'year',
            },
            {
                title: '操作时间',
                dataIndex: 'op_date',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <Button size={"small"} type={"primary"}
                            onClick={this.detail.bind(this, row)}>查看</Button>


                ),
            },
            ]
        ;


        return (

            <div>

                <Row>
                    <Col span={22}>
                        <h3>继续教育信息列表</h3>
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
                                label="咨询师姓名"
                                name="name"
                            >
                                <Input placeholder={'请输入咨询师姓名'} maxLength={21}/>
                            </Form.Item>

                            <Form.Item name="year" label="年度">
                                <DatePicker picker="year" />
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
                        <Table dataSource={this.state.data.data} columns={columns} rowKey="continue_edu_id" pagination={false}/>
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