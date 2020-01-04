<template>


    <div>

        <Row style="padding:5px;">
            <Col span="22">
                <HeaderName name="分部管理"></HeaderName>
            </Col>
            <Col span="2" >
                <Button type="success" @click="add">新增</Button>
            </Col>
        </Row>

        <Table stripe :columns="columns" :data="dataList"></Table>
        <div style="text-align: center;margin-top: 1em;">
            <Page :total="total" :page-size="pageSize" :current="currentPage" @on-change="pageChange"/>
        </div>

    </div>


</template>

<script>
    import {Util} from '../../assets/js/Util'
    import Role from '../../assets/js/Role'
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
                        title: '分部名称',
                        key: 'division_name'
                    },
                    {
                        title: '功能等级',
                        key: 'function_level',
                        render: (h, params) => {
                            let state=''
                            switch (params.row.function_level) {
                                case 0:
                                    state='基础功能'
                                    break;
                                case 1:
                                    state='预约管理'
                                    break;
                                case 2:
                                    state='账单生成'
                                    break;
                                case 3:
                                    state='线上支付'
                                    break;
                            }
                            return h('div', {}, state)
                        }
                    },

                    {
                        title: '创建时间',
                        key: 'create_date'
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
                                },'删除'),
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
                                            this.adminList(params)
                                        }
                                    }
                                },'分部管理员'),
                            ])
                        }
                    }

                ],
                total:0,
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
            getList(page) {

                page=page||1;

                let pageSize=Util.pageSize

                this.http.post('appoint_wx/division/list', {
                    role:Role.divisionManager,
                    page,
                    pageSize

                }).then((data) => {

                    // this.total=data.count;
                    // this.currentPage=data.currentPage;
                    //
                    // this.dataList = data.data;
                    this.dataList=data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            add() {
                this.$router.push('/division/operate')
            },
            adminList(params){
                this.$router.push({
                    path:'/division/adminList',
                    query:{
                        division_id:params.row.division_id
                    }
                })
            },
            edit(params){
                this.$router.push({
                    path:'/division/operate',
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

                        this.http.post('appoint_wx/division/delete',{
                            division_id:params.row.division_id
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
