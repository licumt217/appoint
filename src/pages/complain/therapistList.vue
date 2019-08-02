<template>


    <div>

        <Row style="padding:5px;">
            <Col span="24">
                <HeaderName border name="咨询师投诉用户列表"></HeaderName>
            </Col>
        </Row>
        <Row style="padding:5px">
            <Col span="24">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline >

                    <FormItem prop="therapistName" label="咨询师姓名" :label-width="80">
                        <Input type="text" v-model="formInline.therapistName" placeholder="咨询师姓名">
                        </Input>
                    </FormItem>

                    <FormItem prop="userName" label="用户姓名" :label-width="80">
                        <Input type="text" v-model="formInline.userName" placeholder="用户姓名">
                        </Input>
                    </FormItem>

                    <FormItem label="投诉时间" :label-width="60">
                        <Row>
                            <Col span="11">
                                <DatePicker type="date" placeholder="" v-model="formInline.startDate"></DatePicker>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <DatePicker type="date" placeholder="" v-model="formInline.endDate"></DatePicker>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" icon="ios-search" @click="getList(1)">查询</Button>
                    </FormItem>

                </Form>

            </Col>

        </Row>

        <Table stripe :columns="columns" :data="dataList"></Table>
        <div style="text-align: center;margin-top: 1em;">
            <Page :total="count" :page-size="pageSize" :current="currentPage" @on-change="pageChange"/>
        </div>


<!--        调查报告窗口-->
        <Modal
                v-model="isShowReportModal"
                title="调查报告"
                width="600"
                :mask-closable="false"
        >
            <Row  style="border-bottom: 1px solid gainsboro;margin:7px 0;">
                <Input type="textarea" :rows="7" v-model="curComplain.report" placeholder="请输入调查报告内容">
                </Input>
            </Row>
            <table></table>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowReportModal=false">取消</Button>
                <Button type="primary" size="large" @click="saveReport">确定</Button>
            </div>
        </Modal>

    </div>


</template>

<script>
    import {Util} from '../../assets/js/Util'
    import {TherapistComplain} from '../../assets/models/TherapistComplain'
    import {BlackList} from '../../assets/models/BlackList'
    export default {
        components:{
        },
        data() {
            return {
                isShowReportModal:false,
                formInline: {},
                ruleInline: {},
                columns: [
                    {
                        type:'index',
                        width:60,
                        align:'center',
                        indexMethod:(params)=>{
                            return (this.currentPage-1)*Util.pageSize+(params._index+1);
                        }
                    },
                    {
                        title: '咨询师姓名',
                        key: 'therapistName'
                    },
                    {
                        title: '咨询师手机号',
                        key: 'therapistPhone'
                    },

                    {
                        title: '用户姓名',
                        key: 'userName'
                    },
                    {
                        title: '用户手机号',
                        key: 'userPhone'
                    },

                    {
                        title: '投诉时间',
                        key: 'complainDate'
                    },
                    {
                        title: '投诉内容',
                        key: 'complainContent'
                    },
                    {
                        title: '状态',
                        key: 'state',
                        render: (h, params) => {
                            return h('div', {}, params.row.state === '0' ? '未处理' : params.row.state === '1' ? '已驳回' :'已添加黑名单')
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {

                            if(params.row.state==='0'){
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
                                                this.reject(params)
                                            }
                                        }
                                    },'驳回'),
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'small'
                                        },
                                        style:{
                                            marginRight:'5px'
                                        },
                                        on:{
                                            click:()=>{
                                                this.addBlackList(params)
                                            }
                                        }
                                    },'添加黑名单'),
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
                                                this.showReportModal(params)
                                            }
                                        }
                                    },'调查报告')
                                ])
                            }else{
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
                                                this.showReportModal(params)
                                            }
                                        }
                                    },'调查报告')
                                ])
                            }


                        }
                    }

                ],
                count:0,
                totalPages:0,
                pageSize:Util.pageSize,
                currentPage:1,
                dataList: [],
                curComplain:{},
            }
        },
        mounted() {
            this.getList(1)

        },
        methods: {

            pageChange(page){
              this.getList(page)
            },
            getList(currentPage) {

                let data= TherapistComplain.getList();

                if(data){
                    this.count=data.length;
                    this.totalPages=data.length/10;
                    this.currentPage=1;

                    this.dataList = data;
                }

                return;

                this.http.post('user/list', {
                    currentPage:currentPage,
                    pageSize:this.pageSize,
                }).then(data => {

                    this.count=data.count;
                    this.totalPages=data.totalPages;
                    this.currentPage=data.currentPage;

                    this.dataList = data.data;
                })
            },
            saveReport(){

                TherapistComplain.update(this.curComplain)

                this.$Message.success("操作成功")

                this.isShowReportModal=false;

                this.getList(1)
            },
            /**
             * 调查报告
             * */
            showReportModal(params){
                this.curComplain=params.row;
                this.isShowReportModal=true;
            },
            /**
             * 驳回
             * @param params
             */
            reject(params){
                this.$Modal.confirm({
                    title: '您确认驳回此投诉吗？',
                    content: '',
                    onOk: () => {

                        params.row.state='1'

                        TherapistComplain.update(params.row)

                        this.$Message.success("驳回成功")

                        this.getList(1)

                    },
                    onCancel: () => {
                    }
                });
            },
            /**
             * 添加黑名单
             * @param params
             */
            addBlackList(params){
                this.$Modal.confirm({
                    title: '您确认添加此用户到黑名单吗？',
                    content: '',
                    onOk: () => {

                        params.row.state='2'

                        TherapistComplain.update(params.row)

                        BlackList.add({
                            userName:params.row.userName,
                            userPhone:params.row.userPhone
                        })

                        this.$Message.success("操作成功")

                        this.getList(1)

                    },
                    onCancel: () => {
                    }
                });
            },

            add() {
                console.log(33)
                this.$router.push('/therapist/operate')
            },
            edit(params){
                this.$router.push({
                    path:'/therapist/operate',
                    query:{
                        opType:'edit',
                        formItem:JSON.stringify(params.row)
                    }
                })
            },
            delete(params){

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {

                        this.http.post('user/delete',{
                            id:params.row.id
                        }).then(()=>{
                            this.$Message.success("删除成功")
                            this.getList()
                        }).catch(error=>{
                            this.$Message.error(error)
                        })

                    },
                    onCancel: () => {
                    }
                });


            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
