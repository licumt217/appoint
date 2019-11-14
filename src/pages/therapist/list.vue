<template>


    <div>

        <Row style="padding:5px;">
            <Col span="22">
                <HeaderName name="咨询师管理"></HeaderName>
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
                        title: '姓名',
                        key: 'name',
                        width:130
                    },
                    {
                        title: '手机号',
                        key: 'phone',
                        width:140,
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        width:60,
                        render: (h, params) => {
                                    return h('div', {}, SEX[params.row.gender])
                                }
                    },
                    {
                        title: '电子邮箱',
                        key: 'email',
                        width:160,
                    },
                    {
                        title: '出生日期',
                        key: 'birthday',
                        render: (h, params) => {

                            let date=new Date(params.row.birthday);

                            return h('div', {}, date.Format("yyyy/MM/dd"))

                        }
                    },
                    {
                        title: '流派',
                        key: 'school',
                        render: (h, params) => {
                            return h('div', {}, this.schoolTypeObj[params.row.school_type_id].school_type_name)
                        }
                    },
                    {
                        title: '资历',
                        key: 'qualification',
                        render: (h, params) => {
                            return h('div', {}, this.qualificationTypeObj[params.row.qualification_type_id].qualification_type_name)
                        }
                    },
                    {
                        title: '线上线下',
                        key: 'manner',
                        render: (h, params) => {
                            return h('div', {}, this.mannerTypeObj[params.row.manner_type_id].manner_type_name)
                        }
                    },
                    {
                        title: '等级',
                        key: 'level',
                        render: (h, params) => {
                            return h('div', {}, this.levelTypeObj[params.row.level_type_id].level_type_name)
                        }
                    },
                    {
                        title: '紧急咨询',
                        key: 'isEmergency',
                        render: (h, params) => {
                            return h('div', {}, params.row.isEmergency===0?'不接受':'接受')
                        }
                    },
                    {
                        title: '伦理公告状态',
                        key: 'ethicsNoticeStatus'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width:300,
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
                                            this.setEthicsNotice(params)
                                        }
                                    }
                                },'设置伦理公告')
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
            this.getSchoolTypeList()
            this.getMannerTypeList()
            this.getQualificationTypeList()
            this.getLevelTypeList()
            this.getList(1)

        },
        methods: {

            pageChange(page){
              this.getList(page)
            },
            getSchoolTypeList(){
                this.http.post('appoint_wx/schooltype/list', {}).then((data) => {

                    this.schoolTypeObj=Util.array2Object(data,'school_type_id')

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            getLevelTypeList(){
                this.http.post('appoint_wx/leveltype/list', {}).then((data) => {

                    this.levelTypeObj=Util.array2Object(data,'level_type_id')

                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            getQualificationTypeList(){
                this.http.post('appoint_wx/qualificationtype/list', {}).then((data) => {

                    this.qualificationTypeObj=Util.array2Object(data,'qualification_type_id')

                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            getMannerTypeList(){
                this.http.post('appoint_wx/mannertype/list', {}).then((data) => {

                    this.mannerTypeObj=Util.array2Object(data,'manner_type_id')

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            getList(page) {



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
            add() {
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

                        this.http.post('appoint_wx/user/delete',{
                            user_id:params.row.user_id
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
