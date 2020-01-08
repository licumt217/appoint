<template>


    <div class="login-wrap">

        <Row style="padding:5px;margin-bottom: 3em;">
            <Col span="8" offset="8">
                <HeaderName name="工作室操作"></HeaderName>
            </Col>
        </Row>
        <Row>
            <Col span="8" offset="8">
                <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="100" class="demo-ruleForm">

                    <Form-item prop="station_name" label="工作室名称">
                        <Input  :maxlength="50" placeholder="请输入工作室名称" v-model="formItem.station_name"></Input>
                    </Form-item>
                    <Form-item prop="address" label="工作室地址">
                        <Input  :maxlength="50" placeholder="请输入工作室地址" v-model="formItem.address"></Input>
                    </Form-item>
                    <Form-item prop="phone" label="手机号">
                        <Input  :maxlength="11" placeholder="请输入手机号" v-model="formItem.phone"></Input>
                    </Form-item>


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
    export default {
        data() {
            return {
                isEdit:this.$route.query.opType==='edit',
                user_id:this.$route.query.user_id,
                formItem: {
                },
                rules: {
                    station_name: [
                        {required: true, message: "工作室名称不能为空", trigger: "blur"},
                    ],
                    address: [
                        {required: true, message: "工作室地址不能为空", trigger: "blur"},
                    ],
                    phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur"},
                    ],
                },
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
                this.$router.push('/station/list')
            },
            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        let url='appoint_wx/station/add';
                        if(this.isEdit){
                            url='appoint_wx/station/update'
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
