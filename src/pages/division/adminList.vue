<template>


    <div>

        <Row style="padding:5px;">
            <Col span="20">
                <HeaderName name="分部管理员"></HeaderName>
            </Col>
            <Col span="4" >
                <Button type="success" @click="add">新增</Button>
                <Button @click="back">返回</Button>
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
                        title: '手机号',
                        key: 'phone'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                            return h('div', {}, params.row.gender === 'male' ? '男' : '女')
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
                total:0,
                pageSize:Util.pageSize,
                currentPage:1,
                dataList: [],
                division_id:this.$route.query.division_id
            }
        },
        mounted() {
            this.getList(1)

        },
        methods: {
            back(){
                this.$router.push({
                    path:'/division/list',
                })
            },
            pageChange(page){
                this.getList(page)
            },
            getList(page) {

                page=page||1;

                let pageSize=Util.pageSize

                this.http.post('appoint_wx/divisionAdminRelation/list', {
                    role:Role.divisionManager,
                    division_id:this.division_id,
                    page,
                    pageSize

                }).then((data) => {

                    this.total=data.count;
                    this.currentPage=data.currentPage;

                    this.dataList = data.data;
                    // this.dataList=data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            add() {
                this.$router.push({
                    path:'/division/adminOperate',
                    query:{
                        division_id:this.division_id
                    }
                })
            },
            edit(params){
                this.$router.push({
                    path:'/division/adminOperate',
                    query:{
                        division_id:this.division_id,
                        formItem:JSON.stringify(params.row),
                        opType:'edit'
                    }
                })
            },
            delete(params){

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {

                        this.http.post('appoint_wx/divisionAdminRelation/delete',{
                            user_id:params.row.user_id,
                            division_id:this.division_id
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
