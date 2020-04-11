<template>
    <Modal
            v-model="isShow"
            title="关联咨询师"
            width="60%"
            :mask-closable="false"
    >
        <Row style="">

            <Table stripe :columns="columns" :data="dataList"></Table>
            <div style="text-align: center;margin-top: 1em;">
                <Page :total="total" :page-size="pageSize" :current="currentPage" @on-change="pageChange"/>
            </div>
        </Row>
        <div slot="footer">
            <Button type="text" size="large" @click="isShow=false">关闭</Button>
        </div>
    </Modal>
</template>

<script>
    import {Util} from '../../../assets/js/Util'
    import Role from '../../../assets/js/Role'
    export default {
        components:{
        },
        name: '',
        data() {
            return {
                isShow:false,
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
                        key: 'name'
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
                                        type:'success',
                                        size:'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:()=>{
                                            this.ok(params)
                                        }
                                    }
                                },'关联')
                            ])
                        }
                    }

                ],
                total:0,
                pageSize:Util.pageSize,
                currentPage:1,
                dataList:[]
            }
        },
        props: {
            station_id:{
                type:String,
                default:''
            },
        },
        computed:{
        },
        methods: {
            ok(params){
                this.http.post('appoint_wx/therapist/relate', {
                    station_id:this.station_id,
                    therapist_id:params.row.user_id
                }).then(() => {

                    this.$Message.success('关联成功！')
                    this.isShow=false;

                    this.$emit('done')

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            show(){
                this.isShow=true;

                this.getList(1);


            },
            pageChange(page){
                this.getList(page)
            },
            getList(page){
                page=page||1;

                let pageSize=Util.pageSize
                this.http.post('appoint_wx/user/list', {
                    role:Role.therapist,
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
        }
    }
</script>


<style scoped>
</style>
