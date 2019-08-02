<template>


    <div>

        <Row style="padding:5px;">
            <Col span="22">
                <HeaderName name="案例管理员管理"></HeaderName>
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
    import {CaseManager} from '../../assets/models/CaseManager'
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
                        title: '手机号',
                        key: 'phone'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        render: (h, params) => {
                                    return h('div', {}, params.row.sex === 'male' ? '男' : '女')
                                }
                    },
                    {
                        title: '电子邮箱',
                        key: 'email'
                    },
                    {
                        title: '出生日期',
                        key: 'birthday'
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

                let data= CaseManager.getList();

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
            edit(params){
                this.$router.push({
                    path:'/caseManager/operate',
                    query:{
                        opType:'edit',
                        formItem:params.row,
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
