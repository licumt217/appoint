<template>


    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" >
                <div class="ms-title">预约管理系统</div>

                <div class="ms-login">

                    <Tabs >
                        <Tab-pane label="账户注册" name="account" icon="android-person">

                            <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="80" class="demo-ruleForm">

                                <Form-item prop="phone" label="手机号">
                                    <Input  :maxlength="11" placeholder="请输入手机号" v-model="formItem.phone"></Input>
                                </Form-item>

                                <Form-item prop="password" label="密码">
                                    <Input type="password" placeholder="请输入密码" :maxlength="20" v-model="formItem.password"></Input>
                                </Form-item>

                                <Form-item prop="name" label="姓名">
                                    <Input placeholder="请输入姓名" :maxlength="20" v-model="formItem.name"></Input>
                                </Form-item>

                                <FormItem label="性别" prop="gender">
                                    <RadioGroup v-model="formItem.gender">
                                        <Radio label="0">男</Radio>
                                        <Radio label="1">女</Radio>
                                    </RadioGroup>
                                </FormItem>

                                <Form-item prop="email" label="电子邮箱">
                                    <Input placeholder="请输入电子邮箱" v-model="formItem.email"></Input>
                                </Form-item>

                                <FormItem label="出生日期" prop="birthday" >
                                    <DatePicker type="date" placeholder="请选择出生日期" v-model="formItem.birthday" placement="top"></DatePicker>
                                </FormItem>

                            </Form>

                        </Tab-pane>
                    </Tabs>

                    <div class="login-btn">
                        <Button type="primary" @click="register">注册</Button>
                    </div>
                    <div class="signup-btn">
                        <a href="javascript:" @click="back2Login">返回登录</a>
                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    const md5=require('md5')
    import {Util} from '../../assets/js/Util'
    export default {
        data() {
            return {
                formItem: {
                },
                rules: {
                    phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur"},
                        {type: 'string', min: 11, message: '手机号长度不能少于11位', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"}
                    ],
                    gender: [
                        {required: true, message: "性别不能为空", trigger: "change"}
                    ],
                    birthday: [
                        {required: true, type:"date",message: "出生日期不能为空", trigger: "change"}
                    ],
                    email: [
                        {required: true, message: "电子邮箱不能为空", trigger: "blur"}
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
                this.$router.push('/')
            }
        },
        methods: {
            back2Login(){
              this.$router.go(-1)
            },
            register() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {

                        if(!Util.isValidPhone(this.formItem.phone)){
                            this.$Message.warning("请输入合法的手机号！")
                            return;
                        }

                        if(!Util.isValidEmail(this.formItem.email)){
                            this.$Message.warning("请输入合法的电子邮箱！")
                            return;
                        }

                        this.http.post('login/register', this.formItem).then((data) => {
                            this.$Message.success("注册成功")

                            this.$router.push('/user/login')

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
        top: 20%;
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
