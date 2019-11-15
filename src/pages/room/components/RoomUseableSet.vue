<template>
    <Table stripe :columns="columns" :data="dataList" style="margin-bottom: 1em;"></Table>
</template>

<script>
    import DateUtil from '../../../assets/js/DateUtil'
    import {Util} from '../../../assets/js/Util'
    export default {
        name: '',
        data() {
            return {
                columns:this.getColumns(),
                dataList:[]
            }
        },
        props: {
            date: {
                type: Date,
                default: function () {
                    return {}
                }
            },
            room_id:{
                type:String,
                default:''
            }
        },
        computed: {},
        watch:{
            date(newValue){

                this.year=newValue.getFullYear();
                this.month=newValue.getMonth();

                this.init()
            }
        },
        methods: {
            getColumns() {

                let hourArray = [{
                    title: '上午 8:00-8:50'
                }, {
                    title: '上午 9:00-9:50'
                }, {
                    title: '上午 10:00-10:50'
                }, {
                    title: '上午 11:00-11:50'
                }, {
                    title: '下午 13:00-13:50'
                }, {
                    title: '下午 14:00-14:50'
                }, {
                    title: '下午 15:00-15:50'
                }, {
                    title: '下午 16:00-16:50'
                }]

                hourArray.forEach((value, index, array) => {
                    array[index].key = 'period' + (index + 1)
                })

                let optionArray = [];

                hourArray.forEach((hourObj, index, array) => {
                    optionArray.push({
                        title: hourObj.title,
                        key: hourObj.key,
                        align: 'center',
                        render: (h, params) => {

                            let occupyData=params.row['period' + (index + 1)];

                            if(occupyData){//占用中或不可用
                                if(occupyData.state === 0){

                                    return h('div', [
                                        h('Button', {
                                            props: {
                                                type: 'warning',
                                                size: 'small'
                                            },
                                        }, '占用中')
                                    ])
                                }else{
                                    return h('div', [
                                        h('Button', {
                                            props: {
                                                type: 'error',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    this.setRoomStateCanUse(occupyData)
                                                }
                                            }
                                        }, '设置为可用')
                                    ])
                                }
                            }else{//空闲中
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.setRoomStateCanNotUse(params)
                                            }
                                        }
                                    }, '设置为不可用')
                                ])
                            }

                        }
                    })
                })


                let columns = [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                    },

                    {
                        title: '日期',
                        key: 'date',
                        align: 'center',
                        render: (h, params) => {

                            return h('div', {
                            }, DateUtil.format(params.row.date))

                        }
                    }

                ]

                let operateObj={
                    title: '操作',
                    key: 'action',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params)
                                    }
                                }
                            }, '编辑')
                        ])
                    }
                }

                columns=columns.concat(optionArray)

                columns.push(operateObj)

                return columns;

            },

            init() {

                this.dataList = []

                let notUseableList=[]

                this.http.post('appoint_wx/roomoccupy/list',{
                    room_id:this.room_id,
                    year:this.date.getFullYear(),
                    month:this.date.getMonth()
                }).then((data)=>{

                    notUseableList=data;
                    let days = Util.getDaysOfMonth(this.year, this.month );

                    for (let i = 0; i < days; i++) {

                        let d = new Date(this.date.getTime());

                        d.setDate(i + 1)

                        let obj = {
                            date: d
                        }

                        for (let num = 1; num <= 8; num++) {

                            let occupyData=this.isPeriodInList(num, i + 1, notUseableList)

                            if(occupyData){//占用

                                obj['period' + num]=occupyData
                            }else{
                                obj['period' + num] = null
                            }

                        }

                        this.dataList.push(obj);

                    }

                }).catch(error=>{
                    this.$Message.error(error)
                })

            },
            /**
             * 给定月份的给定天的具体某个时段是否在不可用列表
             * */
            isPeriodInList(period, day, dataList) {
                let flag = null;
                for (let i = 0; i < dataList.length; i++) {
                    if (dataList[i].day === day && period === Number(dataList[i].period)) {

                        flag = dataList[i];
                        break;
                    }
                }

                return flag;
            },


            /**
             * 设置房间可用和不可用状态
             */
            setRoomStateCanNotUse(params) {

                this.http.post('appoint_wx/roomoccupy/add',{
                    room_id:this.room_id,
                    year: params.row.date.getFullYear(),
                    month: params.row.date.getMonth(),
                    day: params.row.date.getDate(),
                    period: params.column.key.substr(6),
                    state:1
                }).then(()=>{

                    this.$Message.success("设置成功！")
                    this.init()

                }).catch(error=>{
                    this.$Message.error(error)
                })



            },

            /**
             * 设置房间可用和可用状态
             */
            setRoomStateCanUse(occupyData) {
                this.http.post('appoint_wx/roomoccupy/delete',{
                    room_occupy_id:occupyData.room_occupy_id,
                }).then(()=>{

                    this.$Message.success("设置成功！")
                    this.init()

                }).catch(error=>{
                    this.$Message.error(error)
                })

            },
        }
    }
</script>

