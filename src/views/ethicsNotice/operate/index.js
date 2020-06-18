import React, {Component} from 'react';
import {
    Button,
    Col,
    Row,
    Form,
    Input,
    Select,
    Space,
    message,
    Divider,
    DatePicker,
    Table,
    Pagination,
    Modal
} from "antd";
import {addDivisionAdmin, updateDivisionAdmin} from "../../../http/service";
import Util from "../../../assets/js/Util";
import Role from "../../../assets/js/Role";
import {NOTICE_SHOW_TYPE} from "../../../assets/js/constants/constant";
import {addEthicsnotice,updateEthicsnotice,getUserList} from "../../../http/service";
import moment from 'moment'

const {Option} = Select;

class Index extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.isEdit = this.props.location.state && this.props.location.state.opType === 'edit'

        let formItem = {
            show_manner: 1,
            therapist_id:''
        }
        if (this.isEdit) {
            formItem = this.props.location.state.formItem
            formItem.therapist_name=formItem.name;
            if(formItem.end_date){
                formItem.end_date = moment(formItem.end_date)
            }

        }


        this.state = {
            formItem,
            therapistListData: {
              data:[]
            },
            visible:false,
        }

    }

    componentDidMount() {
        this.getTherapistList()
    }



    getTherapistList=(page)=>{
        page = page || 1;

        let pageSize = Util.pageSize

        getUserList({
            role:Role.therapist,
            page,
            pageSize
        }).then(data=>{
            this.setState({
                therapistListData:data
            })
        }).catch(err => {
            Util.error(err)
        })
    }


    back = () => {
        this.props.history.goBack()
    }

    close = () => {
        this.setState({
            visible:false
        })
    }
    operate = (form) => {
        form.end_date = Util.getDateFromMoment(form.end_date);


        this.setState({
            formItem: Object.assign(this.state.formItem, form)
        })


        if (this.isEdit) {

            updateEthicsnotice(this.state.formItem).then(data=>{
                Util.success("操作成功！")
                this.back()
            }).catch(err => {
                Util.error(err)
            })

        } else {
            addEthicsnotice(this.state.formItem).then(data=>{
                Util.success("操作成功！")
                this.back()
            }).catch(err => {
                Util.error(err)
            })
        }


    }

    relate=(row)=>{


        this.formRef.current.setFieldsValue({

            therapist_name:row.name,
        })

        this.setState({
            formItem:{
                therapist_id:row.user_id,
            },
        })

        this.close()
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
                title: '咨询师姓名',
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
                                onClick={this.relate.bind(this, row)}>选择</Button>
                    </Space>
                ),
            },
        ];


        return (
            <div>
                <Modal
                    width='50vw'
                    visible={this.state.visible}
                    title="选择咨询师"
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
                                         onChange={this.getTherapistList}/>)
                            :
                            (null)
                    }
                </Modal>

                <Row>
                    <Col span={22}>
                        <h3>伦理公告操作</h3>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col offset={8} span={8}>

                        <Form
                            ref={this.formRef}
                            layout="horizontal"
                            labelCol={{span: 4}}
                            wrapperCol={{span: 20}}
                            initialValues={this.state.formItem}
                            onFinish={this.operate}
                        >
                            {
                                !this.isEdit?
                                    (
                                        <Form.Item label="选择咨询师">
                                            <Button type={"dashed"} onClick={()=>{this.setState({visible:true})}}>选择咨询师</Button>
                                        </Form.Item>
                                    )
                                    :
                                    (
                                       null
                                    )

                            }

                            <Form.Item name="therapist_name" label="咨询师"
                                       rules={[{required: true, message: '咨询师不能为空!'}]}>
                                <Input placeholder={'请选择咨询师'} readOnly />
                            </Form.Item>

                            <Form.Item
                                label="公告内容"
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message: '公告内容不能为空!',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={5} placeholder={'请输入公告内容'} maxLength={500}/>
                            </Form.Item>

                            <Form.Item name="show_manner" label="显示方式"
                                       rules={[{required: true, message: '显示方式不能为空!'}]}>
                                <Select
                                    placeholder="请选择显示方式"
                                >
                                    <Option value={0}>不显示</Option>
                                    <Option value={1}>永久显示</Option>
                                    <Option value={2}>一段时间显示</Option>

                                </Select>
                            </Form.Item>
                            <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) => prevValues.show_manner !== currentValues.show_manner}
                            >

                                {({getFieldValue}) => {
                                    return getFieldValue('show_manner') === 2 ? (
                                        <Form.Item
                                            label="截止日期"
                                            name="end_date"
                                            format="YYYY-MM-DD"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '截止日期不能为空!',
                                                },
                                            ]}
                                        >
                                            <DatePicker/>
                                        </Form.Item>
                                    ) : null
                                }}

                            </Form.Item>


                            <Form.Item wrapperCol={{offset: 8, span: 16}}>


                                <Space>
                                    <Button type="default" onClick={this.back}>
                                        返回
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        确定
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;