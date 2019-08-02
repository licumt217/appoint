<template>


    <div>

        <Row style="padding:5px;">
            <Col span="24">
                <HeaderName border name="用户投诉咨询师列表"></HeaderName>
            </Col>
        </Row>
        <Row style="padding:5px">
            <Col span="24">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline >

                    <FormItem prop="userName" label="用户姓名" :label-width="80">
                        <Input type="text" v-model="formInline.userName" placeholder="用户姓名">
                        </Input>
                    </FormItem>

                    <FormItem prop="therapistName" label="咨询师姓名" :label-width="80">
                        <Input type="text" v-model="formInline.therapistName" placeholder="咨询师姓名">
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

    </div>


</template>

<script>
    import {Util} from '../../assets/js/Util'
    import {UserComplain} from '../../assets/models/UserComplain'
    export default {
        components:{
        },
        data() {
            return {
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
                        title: '用户姓名',
                        key: 'userName'
                    },
                    {
                        title: '用户手机号',
                        key: 'userPhone'
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
                        title: '投诉时间',
                        key: 'complainDate'
                    },
                    {
                        title: '投诉内容',
                        key: 'complainContent'
                    },

                ],
                count:0,
                totalPages:0,
                pageSize:Util.pageSize,
                currentPage:1,
                dataList: [],
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

                let data= UserComplain.getList();

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
