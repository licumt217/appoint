<template>


    <div>

        <Row style="padding:5px;">
            <Col span="22">
                <HeaderName name="伦理公告列表"></HeaderName>
            </Col>
            <Col span="2" >
                <Button type="success" @click="add">新增</Button>
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
    import {EthicsNotice} from '../../assets/models/EthicsNotice'
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
                        title: '咨询师姓名',
                        key: 'therapistId'
                    },
                    {
                        title: '添加时间',
                        key: 'addDate',
                        render: (h, params) => {

                            let date=new Date(params.row.addDate);

                            return h('div', {}, date.Format("yyyy/MM/dd"))

                        }
                    },

                    {
                        title: '显示方式',
                        key: 'showManner',
                        render:(h,params)=>{
                            return h('div',params.row.showManner==='0'?'不显示':params.row.showManner==='1'?'永久显示':'一段时间显示')
                        }
                    },
                    {
                        title: '截止时间',
                        key: 'endDate',
                        render: (h, params) => {

                            if(!params.row.endDate){
                                return ''
                            }

                            let date=new Date(params.row.endDate);

                            return h('div', {}, date.Format("yyyy/MM/dd"))

                        }
                    },
                    {
                        title: '公告内容',
                        key: 'content'
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
                                },'编辑'),
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
                                            this.delete(params)
                                        }
                                    }
                                },'删除')
                            ])
                        }
                    }

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

                let data= EthicsNotice.getList();

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
                this.$router.push('/ethicsNotice/operate')
            },
            edit(params){
                this.$router.push({
                    path:'/ethicsNotice/operate',
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

                        EthicsNotice.delete(params.row.id)
                        this.$Message.success("删除成功")
                        this.getList()
                        return;

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
