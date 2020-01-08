<template>

    <div>

        <Row style="padding:5px;margin-bottom: 3em;">
            <Col span="8" offset="8">
                <HeaderName name="房间操作"></HeaderName>
            </Col>
        </Row>
        <Row>
            <Col span="8" offset="8">
                <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="80" class="demo-ruleForm" style="margin-bottom: 4em;">

                    <Form-item prop="name" label="房间名">
                        <Input size="large" :maxlength="50" placeholder="请输入房间名" v-model="formItem.name"></Input>
                    </Form-item>

                    <Form-item prop="position" label="房间位置">
                        <Input  size="large" :maxlength="100" placeholder="请输入房间位置" v-model="formItem.position"></Input>
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
    import {Util} from '../../assets/js/Util'
    import {Room} from '../../assets/models/Room'
    export default {
        data() {
            return {
                isEdit:this.$route.query.opType==='edit',
                user_id:this.$route.query.user_id,
                formItem: {
                },
                rules: {
                    name: [
                        {required: true, message: "房间名不能为空", trigger: "blur"}
                    ],
                    position: [
                        {required: true, message: "房间位置不能为空", trigger: "blur"}
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
                this.$router.push('/room/list')
            },
            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        let url='appoint_wx/room/add';
                        if(this.isEdit){
                            url='appoint_wx/room/update'
                        }


                        this.http.post(url, this.formItem).then((data) => {

                            if(this.isEdit){
                                this.$Message.success("修改成功！")
                            }else{
                                this.$Message.success("新增成功！")
                            }
                            this.$router.push('/room/list')



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
