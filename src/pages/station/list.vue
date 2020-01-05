<template>


    <div>

        <Row style="padding:5px;">
            <Col span="22">
                <HeaderName name="工作室管理"></HeaderName>
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
    import {Therapist} from "../../assets/models/Therapist";
    import {SEX} from "../../assets/js/constants/constant"
    import Role from '../../assets/js/Role'
    export default {
        components:{
        },
        data() {
            return {
                schoolTypeObj:{},
                qualificationTypeObj:{},
                mannerTypeObj:{},
                levelTypeObj:{},
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
                        title: '工作室名称',
                        key: 'station_name',
                    },
                    {
                        title: '地址',
                        key: 'address',
                    },
                    {
                        title: '联系方式',
                        key: 'phone',
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
                                            this.setCaseManager(params)
                                        }
                                    }
                                },'案例管理员')
                            ])
                        }
                    }

                ],
                total:0,
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
            getList(page) {



                page=page||1;

                let pageSize=Util.pageSize

                this.http.post('appoint_wx/station/list', {
                    role:Role.therapist,
                    page,
                    pageSize

                }).then((data) => {
                    // this.total=data.count;
                    // this.currentPage=data.currentPage;

                    this.dataList = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            setCaseManager(params){
                this.$router.push({
                    path:'/station/caseManagerOperate',
                    query:{
                        station_id:params.row.station_id,
                    }
                })
            },
            add() {
                this.$router.push('/station/operate')
            },
            edit(params){
                this.$router.push({
                    path:'/station/operate',
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

                        this.http.post('appoint_wx/station/delete',{
                            station_id:params.row.station_id
                        }).then(()=>{
                            this.$Message.success("删除成功")
                            this.getList(1)
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
