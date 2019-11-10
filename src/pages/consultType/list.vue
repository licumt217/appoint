<template>


    <div>

        <Row style="padding:5px;">
            <Col span="22">
                <HeaderName name="预约类型管理"></HeaderName>
            </Col>
            <Col span="2">
                <Button type="success" @click="add">新增</Button>
            </Col>
        </Row>

        <Table stripe :columns="columns" :data="dataList"></Table>


        <Modal
                v-model="isShowModal"
                title="预约类型"
                :mask-closable="false"
        >
            <Form :label-width="60">

                <FormItem label="类型">
                    <Input v-model="name" placeholder="请输入预约类型"></Input>
                </FormItem>

                <FormItem label="备注">
                    <Input type="textarea" :rows="5" v-model="remark" placeholder="请输入备注"></Input>
                </FormItem>

            </Form>
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
                name:'',
                remark:'',
                id:'',
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
                        title: '预约类型',
                        key: 'name'
                    },

                    {
                        title: '备注',
                        key: 'remark'
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

                this.http.post('appoint_wx/consulttype/list', {}).then((data) => {

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
                if(!this.name){
                    this.$Message.warning("请输入预约类型")
                }else{

                    if(this.opType==='add'){
                        this.http.post('appoint_wx/consulttype/add', {
                            name:this.name,
                            remark:this.remark
                        }).then(() => {
                            this.$Message.success("操作成功")
                            this.hideModal()
                            this.getList()
                        }).catch(error => {
                            this.$Message.error(error)
                        })
                    }else{
                        this.http.post('appoint_wx/consulttype/update', {
                            id: this.id,
                            name:this.name,
                            remark:this.remark
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

                this.name=''
                this.remark=''

                this.showModal();
            },
            edit(params) {
                this.name=params.row.name;
                this.remark=params.row.remark;
                this.id=params.row.id;

                this.opType='edit'

                this.showModal();
            },
            delete(params) {

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {

                        this.http.post('appoint_wx/consulttype/delete', {
                            id: params.row.id
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
