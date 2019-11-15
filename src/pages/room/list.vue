<template>


    <div>

        <Row style="padding:5px;">
            <Col span="22">
                <HeaderName name="房间管理"></HeaderName>
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
    import {Room} from '../../assets/models/Room'
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
                        title: '房间名',
                        key: 'name'
                    },

                    {
                        title: '房间位置',
                        key: 'position'
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
                                        type:'success',
                                        size:'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:()=>{
                                            this.occupy(params)
                                        }
                                    }
                                },'使用率')
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

                this.http.post('appoint_wx/room/list', {
                    role:Role.divisionManager,
                    page,
                    pageSize

                }).then((data) => {
                    this.total=data.count;
                    this.currentPage=data.currentPage;

                    this.dataList = data.data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            add() {
                this.$router.push('/room/operate')
            },
            edit(params){
                this.$router.push({
                    path:'/room/operate',
                    query:{
                        opType:'edit',
                        formItem:JSON.stringify(params.row)
                    }
                })
            },
            occupy(params){
                this.$router.push({
                    path:'/room/occupy',
                    query:{
                        room_id:params.row.room_id,
                    }
                })
            },
            delete(params){

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {

                        this.http.post('appoint_wx/room/delete',{
                            room_id:params.row.room_id
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
