import React, {Component} from 'react';

import {Row, Col, Button, Table, Space, message, Modal, Divider, Pagination, Form, DatePicker} from "antd";

import Util from "../../../assets/js/Util";

import Role from "../../../assets/js/Role";
import DateUtil from "../../../assets/js/DateUtil";
import {  getRoomPeriodSet, getAppointmentsOfUsingByRoomId} from "../../../http/service";

class Index extends Component {

    constructor(props) {
        super(props);

        this.room_id = this.props.location.state.room_id;
        this.name = this.props.location.state.name;
        this.state = {
            dataSource: [],
            columns: []
        }
    }

    componentDidMount() {
        this.getRoomPeriodSet();
    }

    /**
     * 给定月份的给定天的具体某个时段是否在不可用列表
     * */
    isPeriodInList = (period, day, dataList) => {
        let flag = null;
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].day === day && period === Number(dataList[i].period)) {

                flag = dataList[i];
                break;
            }
        }

        return flag;
    }

    isSameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    }

    isSameDayOfWeek = (date1, date2) => {
        return date1.getDay() === date2.getDay()
    }
    loadData = () => {

        this.dataList = []

        let notUseableList = []

        getAppointmentsOfUsingByRoomId({
            room_id: this.room_id,
        }).then((data) => {

            notUseableList = data;
            let days = Util.getDaysOfMonth(this.year, this.month);

            let nowDate = new Date();

            for (let i = 1; i <= days; i++) {

                let d = new Date(this.date.getTime());


                d.setDate(i)

                let obj = {
                    date: d
                }

                for (let num = 0; num <= 23; num++) {

                    if (d.getTime() < nowDate.getTime()) {//早于当前日期的不统计
                        obj['period' + num] = -1
                    } else {
                        for (let i = 0; i < notUseableList.length; i++) {
                            let appointment = notUseableList[i];
                            if (appointment.ismulti === 0) {//单次预约
                                let isSame = this.isSameDay(new Date(appointment.appoint_date), d)
                                if (isSame && appointment.period.includes(String(num))) {
                                    obj['period' + num] = 1;
                                    break;
                                }
                            } else {

                                if (new Date(appointment.appoint_date).getTime() < d.getTime() && this.isSameDayOfWeek(new Date(appointment.appoint_date), d) && appointment.period.includes(String(num))) {
                                    obj['period' + num] = 1;
                                    break;
                                }
                            }
                        }
                        if (!obj['period' + num]) {
                            obj['period' + num] = 0;
                        }


                    }


                }

                this.dataList.push(obj);

            }

            this.setState({
                dataSource: this.dataList
            })


        }).catch(err => {
            Util.error(err)
        })

    }

    getRoomPeriodSet = () => {

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

    getColumns = () => {

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
                render: (text, row, c) => {

                    //占用率只看当天之后的日期


                    let occupyData = row[hourObj.key];

                    console.log(occupyData)

                    if (occupyData === -1) {//已过期

                        return null;

                    } else if (occupyData === 1) {//占用中或不可用

                        return <Button size={"small"} type={"primary"}>占用中</Button>

                    } else {//空闲中
                        return <span>空闲中</span>
                    }

                }
            })
        })


        let columns = [
            {
                title: '日期',
                dataIndex: 'date',
                render: (text, row) => {
                    return <div>{DateUtil.format(row.date)} ({this.getWeekTextByDate(row.date)})</div>
                }
            }

        ]


        columns = columns.concat(optionArray)


        this.columns = columns;

        this.setState({
            columns
        })

    }

    getWeekTextByDate = (date) => {
        let day = date.getDay();
        return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day]
    }

    query = (form) => {
        let queryDate = form.queryDate

        if (!queryDate) {
            Util.warning("请选择月份！")
        } else {
            queryDate = new Date(Util.getDateFromMoment(queryDate))
            this.date = queryDate
            this.year = queryDate.getFullYear();
            this.month = queryDate.getMonth();

            this.loadData()

        }
    }

    back = () => {
        this.props.history.goBack()
    }

    /**
     * 只能选择当前月份和之后月份
     * @param current
     * @returns {boolean|boolean}
     */
    disabledDate = (current) => {
        let date = Util.getRealDateFromMoment(current)
        return date.getFullYear() < new Date().getFullYear() || (date.getFullYear() === new Date().getFullYear() && date.getMonth() < new Date().getMonth());
    }

    render() {


        return (
            <div>
                <Row>
                    <Col span={20}>
                        <h3>{this.name} / 房间使用率</h3>
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
                                <DatePicker disabledDate={this.disabledDate} style={{width: '10em'}} picker={'month'}/>
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
                        <Table dataSource={this.state.dataSource} columns={this.state.columns} rowKey="date"
                               pagination={false}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;