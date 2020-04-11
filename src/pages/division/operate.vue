<template>


    <div class="login-wrap">

        <Row style="padding:5px;margin-bottom: 3em;">
            <Col span="8" offset="8">
                <HeaderName name="分部操作"></HeaderName>
            </Col>
        </Row>
        <Row>
            <Col span="8" offset="8">
                <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="80" class="demo-ruleForm">

                    <Form-item prop="division_name" label="分部名称">
                        <Input  :maxlength="50" placeholder="请输入姓名" v-model="formItem.division_name"></Input>
                    </Form-item>
                    <FormItem label="功能等级" prop="function_level">
                        <Select v-model="formItem.function_level">
                            <Option v-for="item in function_level_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>


                </Form>

                <Row>
                    <Col span="10" offset="2">
                        <Button long size="large" type="primary" @click="operate">确定</Button>
                    </Col>
                    <Col span="10" offset="2">
                        <Button long size="large" type="primary" ghost @click="back">返回</Button>
                    </Col>
                </Row>
            </Col>
        </Row>

    </div>

</template>

<script>
    const md5=require('md5')
    import {Util} from '../../assets/js/Util'
    import Role from '../../assets/js/Role'
    import DateUtil from '../../assets/js/DateUtil'
    export default {
        data() {
            return {
                isEdit:this.$route.query.opType==='edit',
                user_id:this.$route.query.user_id,
                formItem: {
                },
                rules: {
                    division_name: [
                        {required: true, message: "名称不能为空", trigger: "blur"},
                    ],
                    function_level: [
                        {required: true, message: "功能等级不能为空", trigger: "change",type:'number'},
                    ],
                },
                function_level_list:[{
                    id:0,
                    name:'基础功能'
                },{
                    id:1,
                    name:'预约管理'
                },{
                    id:2,
                    name:'账单生成'
                },{
                    id:3,
                    name:'线上支付'
                }]
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
        },
        mounted() {
            if(this.isEdit){

                this.formItem=JSON.parse(this.$route.query.formItem);

            }
        },
        methods: {
            back(){
                this.$router.push('/division/list')
            },
            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        let url='appoint_wx/division/add';
                        if(this.isEdit){
                            url='appoint_wx/division/update'
                        }

                        this.http.post(url, this.formItem).then((data) => {

                            if(this.isEdit){
                                this.$Message.success("修改成功！")
                            }else{
                                this.$Message.success("新增成功！")
                            }
                            this.back()



                        }).catch(err => {
                            this.$Message.error(err)
                        })

                    }

                })

            },




        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100vh;
        background-size: 100% 100%;
    }

    .mainContent {
        position: absolute;
        left: 50%;
        margin-left: -190px;
    }

    .ms-title {
        width: 100%;
        margin-bottom: 20px;
        text-align: center;
        font-size: 26px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
        letter-spacing: 4px;

    }

    .ms-login {
        width: 380px;
        overflow: hidden;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
        box-sizing: border-box;
        position: relative
    }

    .login-btn {
        text-align: center;
    }

    .signup-btn {
        margin-top: 10px;
        text-align: center;
        cursor: pointer;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }

    .slideT-enter-active, .slideT-leave-active {
        transition: all .6s ease-out;
    }

    .slideT-enter {
        opacity: 0;
        transform: translateY(-30px);
    }

</style>
