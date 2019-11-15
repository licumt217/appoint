<template>


    <div>

        <Row style="padding:5px;">
            <Col span="22">
                <HeaderName name="等级类型管理"></HeaderName>
            </Col>
            <Col span="2">
                <Button type="success" @click="add">新增</Button>
            </Col>
        </Row>

        <Table stripe :columns="columns" :data="dataList"></Table>


        <Modal
                v-model="isShowModal"
                title="请输入等级类型"
                :mask-closable="false"
        >
            <Form :label-width="120">

                <FormItem label="等级">
                    <Input v-model="level_type_name" placeholder="请输入等级类型"></Input>
                </FormItem>

                <FormItem label="分成比例（%）">
                    <Input v-model="divide_ratio" placeholder="请输入分成比例"></Input>
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
                level_type_name:'',
                divide_ratio:'',
                level_type_id:'',
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
                        title: '等级类型',
                        key: 'level_type_name'
                    },

                    {
                        title: '分成比例（%）',
                        key: 'divide_ratio'
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

                this.http.post('appoint_wx/leveltype/list', {}).then((data) => {

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
                if(!this.level_type_name){
                    this.$Message.warning("请输入等级类型")
                }else if(!this.divide_ratio){
                    this.$Message.warning("请输入分成比例")
                }else{

                    if(this.opType==='add'){
                        this.http.post('appoint_wx/leveltype/add', {
                            level_type_name:this.level_type_name,
                            divide_ratio:this.divide_ratio
                        }).then(() => {
                            this.$Message.success("操作成功")
                            this.hideModal()
                            this.getList()
                        }).catch(error => {
                            this.$Message.error(error)
                        })
                    }else{
                        this.http.post('appoint_wx/leveltype/update', {
                            level_type_id: this.level_type_id,
                            level_type_name:this.level_type_name,
                            divide_ratio:this.divide_ratio
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

                this.level_type_name=''

                this.showModal();
            },
            edit(params) {
                this.level_type_name=params.row.level_type_name;
                this.divide_ratio=params.row.divide_ratio;
                this.level_type_id=params.row.level_type_id;

                this.opType='edit'

                this.showModal();
            },
            delete(params) {

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {

                        this.http.post('appoint_wx/leveltype/delete', {
                            level_type_id: params.row.level_type_id
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
