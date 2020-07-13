import React, {Component} from 'react';
import {Button, Col, Divider, Pagination, Row, Space, Table} from "antd";
import Util from "../../../../assets/js/Util";
import DateUtil from "../../../../assets/js/DateUtil";
import {getContinueEduList,getContinueEduSetting,getContinueEduByUserIdAndYear} from "../../../../http/service";


class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],

            canAdd:false,//是否能新增继续教育信息：1、已开启上年度的填写继续教育开关，且当前日期在区间内；2、自己还未添加上年度的继续教育情况

        }
    }

    componentDidMount() {

        this.getSetting()
    }

    getSetting=()=>{
        getContinueEduSetting({
        }).then(data=>{
            if(Util.isEmptyObject(data)){
                Util.info('缺少继续教育设置')
            }else{

                let now=new Date();
                if(data.continue_edu_state===1 && DateUtil.isBetween(now,new Date(data.start_date),new Date(data.end_date))){

                    getContinueEduByUserIdAndYear({
                        year:now.getFullYear()
                    }).then(data=>{
                        if(Util.isEmptyObject(data)){
                            this.setState({
                                canAdd:true
                            })
                        }
                        this.getList()
                    }).catch(err=>{
                        Util.error(err)
                    })
                }else{
                    this.getList()
                }
            }

        }).catch(err=>{
            Util.error(err)
        })
    }


    getList = () => {

        getContinueEduList({
        }).then(data=>{
            this.setState({
                data: data,
            })
        }).catch(err=>{
            Util.error(err)
        })

    }

    add=()=>{

        this.props.history.push({
            pathname:'/therapist/continueEdu/operate',
            opType:'edit'
        })
    }


    render() {

        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                render:(text,row,index)=>{
                    return index+1;
                }
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
                    <Button size={"small"} type={"primary"} danger
                            onClick={this.delete.bind(this, row.blacklist_id)}>移除黑名单</Button>

                ),
            },
        ];


        return (
            <div>
                <Row>
                    <Col span={22}>
                        <h3>继续教育信息列表</h3>
                    </Col>
                    <Col span={2}>
                        {
                            this.state.canAdd?
                                <Button type={"primary"} onClick={this.add}>新增</Button>
                                :null

                        }
                    </Col>
                </Row>
                <Divider/>
                <Row justify={'center'}>
                    <Col span={24}>
                        <Table dataSource={this.state.data.data} columns={columns} rowKey="user_id" pagination={false}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;