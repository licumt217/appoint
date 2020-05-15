import React, {Component} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, Pagination, Row, Modal, Space, Table} from "antd";
import Util from "../../../assets/js/Util";

const {RangePicker} =DatePicker;

class Index extends Component {
    formRef = React.createRef();
    modalRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            visible:false,
            reportContent:'',
            form:{}

        }
    }

    componentDidMount() {
        this.getList(1)
    }


    getList = (currentPage) => {

        let data=[]

        if (data) {

            this.setState({
                data: data,
                count: data.length
            })
        }


    }

    close=()=>{
        this.setState({
            visible:false
        })
    }


    query=(form)=>{

        let obj=Object.assign({},this.state.form,form)
        if(obj.date){
            obj.startDate=Util.getDateFromMoment(obj.date[0])
            obj.endDate=Util.getDateFromMoment(obj.date[1])
        }


        this.close()
    }


    saveReport=(form)=>{

        let a=this.modalRef;


        a.current.submit()



    }
    /**
     * 调查报告
     * */
    showReportModal=(params)=>{

    }

    /**
     * 驳回
     * @param params
     */
    reject=(params)=>{
        Util.confirm({
            title: '您确认驳回此投诉吗？',
            content: '',
            onOk: () => {

                params.row.state='1'

                Util.success("驳回成功")

                this.getList(1)

            },
            onCancel: () => {
            }
        });
    }
    /**
     * 添加黑名单
     * @param params
     */
    addBlackList=(params)=>{
        Util.confirm({
            title: '您确认添加此用户到黑名单吗？',
            content: '',
            onOk: () => {

                Util.success("操作成功")

                this.getList(1)

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
                    dataIndex: 'therapistId',
                },
                {
                    title: '咨询师手机号',
                    dataIndex: 'therapistPhone',
                },
                {
                    title: '用户姓名',
                    dataIndex: 'userName',
                },
                {
                    title: '用户手机号',
                    dataIndex: 'userPhone',
                },
                {
                    title: '投诉时间',
                    dataIndex: 'complainDate',
                },
                {
                    title: '投诉内容',
                    dataIndex: 'complainContent',
                },
                {
                    title: '状态',
                    dataIndex: 'state',
                    render: (text) => {
                        return text === '0' ? '未处理' : text === '1' ? '已驳回' : '已添加黑名单'
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    render: (text, row) => {
                        return row.state === '0' ?
                            <Space size="middle">
                                <Button size={"small"} type={"primary"} onClick={this.reject.bind(this, row)}
                                        danger>编辑</Button>
                                <Button size={"small"} type={"primary"}
                                        onClick={this.addBlackList.bind(this, row)}>添加黑名单</Button>
                                <Button size={"small"} type={"primary"}
                                        onClick={this.setState({visible:true})}>调查报告</Button>
                            </Space>
                            :
                            <Space size="middle">
                                <Button size={"small"} type={"primary"}
                                        onClick={this.setState({visible:true})}>调查报告</Button>
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
                    onOk={this.saveReport}
                    onCancel={this.close}
                >
                    <Form ref={this.modalRef}
                          onFinish={this.query}

                    >
                        <Form.Item name={'reportContent'} rules={[
                            {
                                required: true,
                                message: '调查报告内容不能为空!',
                            },
                        ]}>
                            <Input.TextArea rows={5} placeholder={'请输入调查报告内容'} ></Input.TextArea>
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
                    <Col >
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
                                <RangePicker />
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