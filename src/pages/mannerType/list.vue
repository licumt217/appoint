<template>


    <div>

        <Row style="padding:5px;">
            <Col span="22">
                <HeaderName name="咨询方式类型管理"></HeaderName>
            </Col>
            <Col span="2">
                <Button type="success" @click="add">新增</Button>
            </Col>
        </Row>

        <Table stripe :columns="columns" :data="dataList"></Table>


        <Modal
                v-model="isShowModal"
                title="请输入咨询方式类型"
                :mask-closable="false"
        >
            <p>
                <Input  :maxlength="50" placeholder="请输入咨询方式类型" v-model="manner_type_name"></Input>
            </p>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowModal=false">取消</Button>
                <Button type="primary" size="large" @click="addOrUpdate">确定</Button>
            </div>
        </Modal>



    </div>


</template>

<script>
    import {Util} from '../../assets/js/Util'
    import Role from '../../assets/js/Role'

    export default {
        components: {},
        data() {
            return {
                isShowModal:false,
                manner_type_name:'',
                manner_type_id:'',
                opType:'add',
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                        indexMethod: (params) => {
                            return params._index + 1
                        }
                    },

                    {
                        title: '咨询方式类型',
                        key: 'manner_type_name'
                    },


                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }

                ],
                dataList: [],
            }
        },
        mounted() {
            this.getList()

        },
        methods: {

            getList() {

                this.http.post('appoint_wx/mannertype/list', {}).then((data) => {

                    this.dataList = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            showModal(){
              this.isShowModal=true;
            },
            hideModal(){
                this.isShowModal=false;
            },

            addOrUpdate(){
                if(!this.manner_type_name){
                    this.$Message.warning("请输入咨询方式类型")
                }else{

                    if(this.opType==='add'){
                        this.http.post('appoint_wx/mannertype/add', {
                            manner_type_name:this.manner_type_name
                        }).then(() => {
                            this.$Message.success("操作成功")
                            this.hideModal()
                            this.getList()
                        }).catch(error => {
                            this.$Message.error(error)
                        })
                    }else{
                        this.http.post('appoint_wx/mannertype/update', {
                            manner_type_id: this.manner_type_id,
                            manner_type_name:this.manner_type_name
                        }).then(() => {
                            this.$Message.success("操作成功")
                            this.hideModal()
                            this.getList()
                        }).catch(error => {
                            this.$Message.error(error)
                        })
                    }


                }
            },

            add() {
                this.opType='add'

                this.manner_type_name=''

                this.showModal();
            },
            edit(params) {
                this.manner_type_name=params.row.manner_type_name;
                this.manner_type_id=params.row.manner_type_id;

                this.opType='edit'

                this.showModal();
            },
            delete(params) {

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {

                        this.http.post('appoint_wx/mannertype/delete', {
                            manner_type_id: params.row.manner_type_id
                        }).then(() => {
                            this.$Message.success("删除成功")
                            this.getList()
                        }).catch(error => {
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
