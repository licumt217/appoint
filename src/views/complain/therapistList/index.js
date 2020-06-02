import React, {Component} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, Pagination, Row, Modal, Space, Table} from "antd";
import Util from "../../../assets/js/Util";
import {getTherapistComplaints,saveResearchReport,rejectComplaint,addBlacklist} from "../../../http/service";
import Complaint_STATE from "../../../assets/js/constants/Complaint_STATE";

const {RangePicker} = DatePicker;

class Index extends Component {
    formRef = React.createRef();
    modalRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            visible: false,
            reportContent: '',
            form: {},

        }
    }

    componentDidMount() {
        this.getList(1)
    }


    getList = (page) => {
        page = page || 1;

        let pageSize = Util.pageSize
        getTherapistComplaints(Object.assign({
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
            obj.endDate = Util.getDateFromMoment(obj.date[1]) + ` 23:59:59`

        } else {
            obj.startDate = ''
            obj.endDate = ''
        }

        this.setState({
            form: obj
        })

        this.getList()
    }


    checkReport = () => {

        this.modalRef.current.submit();


    }

    saveReport=(form)=>{
        saveResearchReport({
            complaint_id:this.modalRef.current.getFieldValue('complaint_id'),
            report_content:form.report_content
        }).then(data => {
            Util.success(`操作成功！`)
            this.close()
            this.getList(this.state.data.currentPage)
        }).catch(err => {
            Util.error(err)
        })
    }


    /**
     * 驳回
     * @param params
     */
    reject = (row) => {
        Util.confirm({
            title: '您确认驳回此投诉吗？',
            content: '',
            onOk: () => {

                rejectComplaint({
                    complaint_id:row.complaint_id
                }).then(data => {
                    Util.success(`已驳回！`)
                    this.getList(this.state.data.currentPage)
                }).catch(err => {
                    Util.error(err)
                })

            },
            onCancel: () => {
            }
        });
    }
    /**
     * 添加黑名单
     * @param params
     */
    addBlackList = (row) => {
        Util.confirm({
            title: '您确认添加此用户到黑名单吗？',
            content: '',
            onOk: () => {

                addBlacklist({
                    complaint_id:row.complaint_id,
                    user_id:row.user_id,
                }).then(data => {
                    Util.success(`已添加！`)
                    this.getList(this.state.data.currentPage)
                }).catch(err => {
                    Util.error(err)
                })

            },
            onCancel: () => {
            }
        });
    }

    close=()=>{
        this.setState({
            visible:false,
        })
    }

    show=(row)=>{
        this.setState({
            visible:true,
        })
        setTimeout(()=>{
            this.modalRef.current.setFieldsValue(row)
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
                    title: '咨询师姓名',
                    dataIndex: 'therapist_name',
                },
                {
                    title: '咨询师手机号',
                    dataIndex: 'therapist_phone',
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
                {
                    title: '操作',
                    dataIndex: 'action',
                    render: (text, row) => {
                        return row.state === Complaint_STATE.UNHANDLED ?
                            <Space size="middle">
                                <Button size={"small"} type={"primary"}
                                        onClick={this.addBlackList.bind(this, row)}>添加黑名单</Button>
                                <Button size={"small"} type={"primary"} onClick={this.reject.bind(this, row)}
                                        danger>驳回</Button>

                                <Button size={"small"} type={"primary"}
                                        onClick={this.show.bind(this,row)}>调查报告</Button>
                            </Space>
                            :
                            <Space size="middle">
                                <Button size={"small"} type={"primary"}
                                        onClick={this.show.bind(this,row)}>调查报告</Button>
                            </Space>

                    }
                }
            ]
        ;


        return (

            <div>

                <Modal
                    title="调查报告"
                    visible={this.state.visible}
                    onOk={this.checkReport}
                    onCancel={this.close}
                >
                    <Form ref={this.modalRef}
                          onFinish={this.saveReport}

                    >
                        <Form.Item name={'report_content'} rules={[
                            {
                                required: true,
                                message: '调查报告内容不能为空!',
                            },
                        ]}>
                            <Input.TextArea rows={5} placeholder={'请输入调查报告内容'}></Input.TextArea>
                        </Form.Item>
                    </Form>
                </Modal>


                <Row>
                    <Col span={22}>
                        <h3>咨询师投诉用户列表</h3>
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
                                name="therapistName"
                            >
                                <Input key={1} placeholder={'请输入咨询师姓名'} maxLength={11}/>
                            </Form.Item>

                            <Form.Item
                                label="用户姓名"
                                name="userName"
                            >
                                <Input placeholder={'请输入用户姓名'} maxLength={21}/>
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