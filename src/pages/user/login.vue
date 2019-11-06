<template>

    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" >
                <div class="ms-title">预约管理系统</div>

                <div class="ms-login">

                    <Tabs >
                        <Tab-pane label="账户登录" name="account" icon="android-person">

                            <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="0" class="demo-ruleForm">

                                <Form-item prop="phone">
                                    <Input  :maxlength="11" placeholder="请输入手机号" v-model="formItem.phone"></Input>
                                </Form-item>

                                <Form-item prop="password">
                                    <Input type="password" placeholder="请输入密码" :maxlength="20" v-model="formItem.password"></Input>
                                </Form-item>

                            </Form>

                        </Tab-pane>
                    </Tabs>

                    <p class="" style="text-align: right;">
                        <a href="javascript:;" style="color:#393737;cursor: pointer;" @click="showForgetModal">忘记密码？</a>
                    </p>

                    <div class="login-btn">
                        <Button type="primary" @click="login">登录</Button>
                    </div>

                </div>
            </div>
        </transition>

        <Modal
                v-model="isShowForgetModal"
                title="请输入手机号"
                :mask-closable="false"
        >
            <p>
                <Input  :maxlength="11" placeholder="请输入手机号" v-model="phone"></Input>
            </p>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowForgetModal=false">取消</Button>
                <Button type="primary" size="large" @click="ok">确定</Button>
            </div>
        </Modal>
    </div>

</template>

<script>
    import {Util} from '../../assets/js/Util'
    export default {
        data() {
            return {
                phone:'',
                isShowForgetModal:false,
                formItem: {
                    phone: '',
                    password: '',
                },
                rules: {
                    phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"}
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
            if (this.isLogin) {
                this.goAfterLogin()

            }
        },
        methods: {
            ok(){
                if(this.phone && Util.isValidPhone(this.phone)){

                    this.http.post('login/forgetPassword', {
                        phone:this.phone
                    }).then((data) => {

                        this.hideForgetModal()

                        this.$Message.success({
                            content:`新的随机密码已发送至手机号${this.phone}对应的邮箱${data.email}，请注意查收！`,
                            duration:7
                        })

                    }).catch(err => {
                        this.$Message.error(err)
                    })

                }else{
                    this.$Message.warning(`请填写正确的手机号！`)
                    this.isShowForgetModal=true;
                }

            },
            showForgetModal(){
                this.isShowForgetModal=true;
            },
            hideForgetModal(){
                this.isShowForgetModal=false;
            },
            register(){
                this.$router.push('/user/register')
            },
            goAfterLogin(){
                if(Number(sessionStorage.appoint_role)===3){
                    this.$router.push('/caseManager/list')
                }else{
                    this.$router.push('/user/list')
                }
            },
            login() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {

                        this.http.post('appoint_wx/user/login', this.formItem).then((data) => {

                            let userId=data.id;
                            let role=data.role;

                            if(role===4){
                                this.$Message.warning("无权限！！！")
                            }else{
                                sessionStorage.appoint_token=data.token;
                                sessionStorage.appoint_userId=userId
                                sessionStorage.appoint_role=role

                                this.$store.commit("userId",userId)

                                this.$store.commit("appoint_role",role)

                                this.$store.commit('isLogin', true)

                                this.$Message.success("登录成功")

                                this.goAfterLogin()
                            }



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
        background: url("../../assets/images/bg-image.jpg");
        background-size: 100% 100%;
    }

    .mainContent {
        position: absolute;
        top: 25%;
        left: 50%;
        margin-left: -180px;
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
        width: 360px;
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
