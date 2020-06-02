import React, {Component} from 'react';

import {Row, Col, Button, Table, Space, message, Modal, Divider, Pagination, Form, DatePicker} from "antd";

import Util from "../../../assets/js/Util";

import Role from "../../../assets/js/Role";
import DateUtil from "../../../assets/js/DateUtil";
import {addRoomOccupy,deleteRoomOccupy,getRoomPeriodSet,getRoomOccupyList} from "../../../http/service";

class Index extends Component {

    constructor(props) {
        super(props);

        this.room_id=this.props.location.state.room_id;
        this.name=this.props.location.state.name;
        this.state={
            dataSource:[],
            columns:[]
        }
    }

    componentDidMount() {
        this.getRoomPeriodSet();
    }

    /**
     * 给定月份的给定天的具体某个时段是否在不可用列表
     * */
    isPeriodInList=(period, day, dataList)=> {
        let flag = null;
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].day === day && period === Number(dataList[i].period)) {

                flag = dataList[i];
                break;
            }
        }

        return flag;
    }

    loadData=()=> {

        this.dataList = []

        let notUseableList = []

        getRoomOccupyList({
            room_id: this.room_id,
            year: this.year,
            month: this.month
        }).then((data) => {

            notUseableList = data;
            let days = Util.getDaysOfMonth(this.year, this.month);

            for (let i = 1; i <= days; i++) {

                let d = new Date(this.date.getTime());



                d.setDate(i )

                let obj = {
                    date: d
                }

                for (let num = 0; num <= 23; num++) {

                    let occupyData = this.isPeriodInList(num, i , notUseableList)

                    if (occupyData ) {//占用

                        obj['period' + num] = occupyData
                    } else {
                        obj['period' + num] = null
                    }

                }

                this.dataList.push(obj);

            }

            this.setState({
                dataSource:this.dataList
            })



        }).catch(err => {
            Util.error(err)
        })

    }

    getRoomPeriodSet=()=> {

        getRoomPeriodSet().then((data) => {
            this.period = data.period.split(',')
            this.period.sort((val1, val2) => {
                return Number(val1) - Number(val2)
            });
            this.getColumns()
        }).catch(err => {
            Util.error(err)
        })

    }

    /**
     * 设置房间可用和不可用状态
     */
    setRoomStateCanNotUse=(row,period)=> {


        addRoomOccupy( {
            room_id: this.room_id,
            year: row.date.getFullYear(),
            month: row.date.getMonth(),
            day: row.date.getDate(),
            period: period,
            state: 1
        }).then(() => {

            Util.success("设置成功！")
            this.loadData()

        }).catch(err => {
            Util.error(err)
        })


    }

    /**
     * 设置房间可用和可用状态
     */
    setRoomStateCanUse=(occupyData)=> {
        deleteRoomOccupy( {
            room_occupy_id: occupyData.room_occupy_id,
        }).then(() => {

            Util.success("设置成功！")
            this.loadData()

        }).catch(err => {
            Util.error(err)
        })

    }

    getColumns=()=> {

        let hourArray = []

        this.period.forEach((item) => {
            hourArray.push({
                title: `${item}:00-${item}:50`,
                key: `period${item}`,
            })
        })

        let optionArray = [];

        hourArray.forEach((hourObj, index, array) => {
            optionArray.push({
                title: hourObj.title,
                dataIndex: hourObj.key,
                render: (text, row,c) => {


                    let occupyData = row[hourObj.key];

                    console.log(occupyData)

                    if (occupyData) {//占用中或不可用

                        if (occupyData.state === 0) {

                            return <Button size={"small"} type={"default"} >占用中</Button>

                        } else {
                            return <Button size={"small"} type={"primary"} danger onClick={this.setRoomStateCanUse.bind(this,occupyData)}>设置为可用</Button>
                        }
                    } else {//空闲中
                        return <Button size={"small"} type={"primary"} onClick={this.setRoomStateCanNotUse.bind(this,row,hourObj.key.substr(6))}>设置为不可用</Button>
                    }

                }
            })
        })


        let columns = [
            {
                title: '日期',
                dataIndex: 'date',
                render: (text, row) => {
                    return <div>{DateUtil.format(row.date)}</div>
                }
            }

        ]



        columns = columns.concat(optionArray)


        this.columns = columns;

        this.setState({
            columns
        })

    }

    query=(form)=> {
        let queryDate=form.queryDate

        if (!queryDate) {
            Util.warning("请选择月份！")
        }else{
            queryDate=new Date(Util.getDateFromMoment(queryDate))
            this.date=queryDate
            this.year = queryDate.getFullYear();
            this.month = queryDate.getMonth();

            this.loadData()

        }
    }

    back=()=> {
        this.props.history.goBack()
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
                title: '房间名',
                dataIndex: 'name',
            },
            {
                title: '房间位置',
                dataIndex: 'position',
            },
            {
                title: '状态',
                dataIndex: 'state',
                render:(text)=>{
                    return text===0?'已启用':'已停用'
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, row) => (
                    <div></div>
                    // <Space size="middle">
                    //     <Button size={"small"} type={"primary"} onClick={this.edit.bind(this,row)}>编辑</Button>
                    //     <Button size={"small"} type={"primary"} danger onClick={this.delete.bind(this,row.room_id)}>删除</Button>
                    //     <Button size={"small"} type={"primary"} onClick={this.occupy.bind(this,row.room_id)}>使用率</Button>
                    //     {
                    //         row.state===0?
                    //             (
                    //                 <Button size={"small"} type={"primary"} danger onClick={this.onOff.bind(this,row)}>停用</Button>
                    //             )
                    //             :
                    //             (
                    //                 <Button size={"small"} type={"primary"} onClick={this.onOff.bind(this,row)}>启用</Button>
                    //             )
                    //     }
                    // </Space>
                ),
            },
        ];

        return (
            <div>
                <Row>
                    <Col span={20}>
                        <h3>{this.name} / 房间可用设置</h3>
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
                                label="月份"
                                name="queryDate"
                                format="YYYY-MM-DD"
                            >
                                <DatePicker style={{width:'10em'}} picker={'month'} />
                            </Form.Item>


                            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                <Space>
                                    <Button style={{width: '6em'}} type="primary" htmlType="submit">
                                        查询
                                    </Button>
                                    <Button style={{width: '6em'}} type="default" onClick={this.back}>
                                        返回
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <Table dataSource={this.state.dataSource} columns={this.state.columns} rowKey="date" pagination={false}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;