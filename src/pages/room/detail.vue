<template>

    <div>
        <Row style="padding:5px;">
            <Col span="24">
                <HeaderName border name="房间可用设置"></HeaderName>
            </Col>
        </Row>
        <Row style="padding:5px">
            <Col span="24">
                <Form ref="formInline" inline >

                    <FormItem label="月份" :label-width="60">
                        <DatePicker type="month" placeholder="" v-model="month"></DatePicker>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" icon="ios-search" @click="getList(1)">查询</Button>
                    </FormItem>

                </Form>
            </Col>

        </Row>

        <Table stripe :columns="columns" :data="dataList"></Table>
        <div style="text-align: center;margin-top: 1em;">
<!--            <Page :total="count" :page-size="pageSize" :current="currentPage" @on-change="pageChange"/>-->
        </div>
    </div>




</template>

<script>
    const md5=require('md5')
    import {Util} from '../../assets/js/Util'
    import {Room} from '../../assets/models/Room'
    import {RoomCanNotUseState} from '../../assets/models/RoomCanNotUseState'
    export default {
        data() {
            return {
                month:'',
                columns: [
                    {
                        type:'index',
                        width:60,
                        align:'center',
                    },

                    {
                        title: '日期',
                        key: 'date',
                        align:'center',
                    },

                    {
                        title: '上午 8:00-8:50',
                        key: 'period1',
                        align:'center',
                        render: (h, params) => {
                            if(params.row.period1==='0'){
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'primary',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanNotUse(params)
                                            }
                                        }
                                    },'设置为不可用')
                                ])
                            }else{
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanUse(params)
                                            }
                                        }
                                    },'设置为可用')
                                ])
                            }


                        }
                    },

                    {
                        title: '上午 9:00-9:50',
                        key: 'period2',
                        align:'center',
                        render: (h, params) => {
                            if(params.row.period2==='0'){
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'primary',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanNotUse(params)
                                            }
                                        }
                                    },'设置为不可用')
                                ])
                            }else{
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanUse(params)
                                            }
                                        }
                                    },'设置为可用')
                                ])
                            }


                        }
                    },

                    {
                        title: '上午 10:00-10:50',
                        key: 'period3',
                        align:'center',
                        render: (h, params) => {
                            if(params.row.period3==='0'){
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'primary',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanNotUse(params)
                                            }
                                        }
                                    },'设置为不可用')
                                ])
                            }else{
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanUse(params)
                                            }
                                        }
                                    },'设置为可用')
                                ])
                            }


                        }
                    },

                    {
                        title: '上午 11:00-11:50',
                        key: 'period4',
                        align:'center',
                        render: (h, params) => {
                            if(params.row.period4==='0'){
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'primary',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanNotUse(params)
                                            }
                                        }
                                    },'设置为不可用')
                                ])
                            }else{
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanUse(params)
                                            }
                                        }
                                    },'设置为可用')
                                ])
                            }


                        }
                    },

                    {
                        title: '下午 13:00-13:50',
                        key: 'period5',
                        align:'center',
                        render: (h, params) => {
                            if(params.row.period5==='0'){
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'primary',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanNotUse(params)
                                            }
                                        }
                                    },'设置为不可用')
                                ])
                            }else{
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanUse(params)
                                            }
                                        }
                                    },'设置为可用')
                                ])
                            }


                        }
                    },

                    {
                        title: '下午 14:00-14:50',
                        key: 'period6',
                        align:'center',
                        render: (h, params) => {
                            if(params.row.period6==='0'){
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'primary',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanNotUse(params)
                                            }
                                        }
                                    },'设置为不可用')
                                ])
                            }else{
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanUse(params)
                                            }
                                        }
                                    },'设置为可用')
                                ])
                            }


                        }
                    },

                    {
                        title: '下午 15:00-15:50',
                        key: 'period7',
                        align:'center',
                        render: (h, params) => {
                            if(params.row.period7==='0'){
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'primary',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanNotUse(params)
                                            }
                                        }
                                    },'设置为不可用')
                                ])
                            }else{
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanUse(params)
                                            }
                                        }
                                    },'设置为可用')
                                ])
                            }


                        }
                    },

                    {
                        title: '下午 16:00-16:50',
                        key: 'period8',
                        align:'center',
                        render: (h, params) => {
                            if(params.row.period8==='0'){
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'primary',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanNotUse(params)
                                            }
                                        }
                                    },'设置为不可用')
                                ])
                            }else{
                                return h('div', [
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.setRoomStateCanUse(params)
                                            }
                                        }
                                    },'设置为可用')
                                ])
                            }


                        }
                    },




                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button',{
                                    props:{
                                        type:'primary',
                                        size:'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:()=>{
                                            this.edit(params)
                                        }
                                    }
                                },'编辑')
                            ])
                        }
                    }

                ],
                dataList: [],
                roomId: '359baf4a6e1f4cc5a10ad31d1b2f5317'
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
        },
        mounted() {

            this.init()
        },
        methods: {
            init(){
                let roomId=this.roomId

                this.dataList=[]

                let date=new Date()

                let year=date.getFullYear()

                let mon=date.getMonth()

                let list=RoomCanNotUseState.getListByYearAndMonth(roomId,year,mon)


                let days=this.getDaysOfMonth(date.getFullYear(),date.getMonth()+1);

                for(let i=0;i<days;i++){
                    let d=new Date()
                    d.setDate(i+1)
                    let obj={
                        date:d
                    }

                    for(let num=1;num<=8;num++){
                        if(this.isPeriodInList(num,i+1,list)){
                            // debugger
                            obj['period'+num]='1'

                            console.log(JSON.stringify(obj))
                        }else{
                            obj['period'+num]='0'
                        }
                    }



                    this.dataList.push(obj);


                }
            },
            isPeriodInList(period,day,dataList){
                let flag=null;
                for(let i=0;i<dataList.length;i++){
                    if(dataList[i].day===day && period===Number(dataList[i].period)){
                        flag=dataList[i];
                        break;
                    }
                }

                return flag;
            },
            getDaysOfMonth(year,month){
                let d = new Date(year, month, 0);
                return d.getDate();
            },
            back(){
                this.$router.push('/room/list')
            },
            /**
             * 设置房间可用和不可用状态
             */
            setRoomStateCanNotUse(params){

                // console.log(JSON.stringify(params))
                // return ;
                RoomCanNotUseState.add({
                    roomId:this.roomId,
                    year:params.row.date.getFullYear(),
                    month:params.row.date.getMonth(),
                    day:params.row.date.getDate(),
                    period:params.column.key.substr(6)
                })

                this.$Message.success("设置成功！")
                this.init()

            },

            /**
             * 设置房间可用和可用状态
             */
            setRoomStateCanUse(params){

                // debugger

                // console.log(JSON.stringify(params))
                // return ;
                RoomCanNotUseState.deleteByRoomIdYearMonthDayPeriod({
                    roomId:this.roomId,
                    year:params.row.date.getFullYear(),
                    month:params.row.date.getMonth(),
                    day:params.row.date.getDate(),
                    period:params.column.key.substr(6)
                })

                this.$Message.success("设置成功！")
                this.init()

            },
            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        let url='user/add';
                        if(this.isEdit){
                            url='user/update'
                        }


                        if(this.isEdit){
                            Room.update(this.formItem)
                            this.$Message.success("修改成功！")
                        }else{
                            Room.add(this.formItem)
                            this.$Message.success("新增成功！")
                        }
                        this.$router.push('/room/list')

                        return;


                        this.http.post(url, this.formItem).then((data) => {

                            if(this.isEdit){
                                this.$Message.success("修改成功！")
                            }else{
                                this.$Message.success("新增成功！")
                            }
                            this.$router.push('/room/list')



                        }).catch(err => {
                            this.$Message.error(err)
                        })

                    }

                })

            },




        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100vh;
        background-size: 100% 100%;
    }

    .mainContent {
        position: absolute;
        left: 50%;
        margin-left: -190px;
    }

    .ms-title {
        width: 100%;
        margin-bottom: 20px;
        text-align: center;
        font-size: 26px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
        letter-spacing: 4px;

    }

    .ms-login {
        width: 380px;
        overflow: hidden;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
        box-sizing: border-box;
        position: relative
    }

    .login-btn {
        text-align: center;
    }

    .signup-btn {
        margin-top: 10px;
        text-align: center;
        cursor: pointer;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }

    .slideT-enter-active, .slideT-leave-active {
        transition: all .6s ease-out;
    }

    .slideT-enter {
        opacity: 0;
        transform: translateY(-30px);
    }

</style>
