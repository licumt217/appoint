<template>


    <div>

        <Row style="padding:5px;">
            <Col span="22">
                <HeaderName name="预检表管理"></HeaderName>
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
    import {PreCheck} from '../../assets/models/PreCheck'
    export default {
        components:{
        },
        data() {
            return {
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
                        title: '姓名',
                        key: 'userId'
                    },

                    {
                        title: '手机号',
                        key: 'userPhone'
                    },


                    {
                        title: '答题时间',
                        key: 'answerDate'
                    },
                    {
                        title: '状态',
                        key: 'state',
                        render: (h, params) => {
                            return h('div', {}, params.row.state === '0' ? '未答题' : '已答题')
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
                                            this.detail(params)
                                        }
                                    }
                                },'查看详情')
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

                let data= PreCheck.getList();

                if(data){
                    this.count=data.length;
                    this.totalPages=data.length/10;
                    this.currentPage=1;

                    this.dataList = data;
                }



                // return;
                //
                // this.http.post('user/list', {
                //     currentPage:currentPage,
                //     pageSize:this.pageSize,
                // }).then(data => {
                //
                //     this.count=data.count;
                //     this.totalPages=data.totalPages;
                //     this.currentPage=data.currentPage;
                //
                //     this.dataList = data.data;
                // })
            },
            add() {
                this.$router.push('/caseManager/operate')
            },
            detail(params){

                this.$router.push({
                    path:'/preCheck/operate',
                    query:{
                        opType:'edit',
                        formItem:JSON.stringify(params.row),
                    }
                })
            },
            delete(params){

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {

                        CaseManager.delete(params.row.id)
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
