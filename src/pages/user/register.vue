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

                                <Form-item prop="identification_no" label="身份证号">
                                    <Input  type="text" placeholder="请输入身份证号" v-model="formItem.identification_no"></Input>
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


                                <FormItem label="流派" prop="school_type_id">
                                    <Select v-model="formItem.school_type_id">
                                        <Option v-for="item in schoolTypeList" :value="item.school_type_id" :key="item.school_type_id">{{ item.school_type_name }}</Option>
                                    </Select>
                                </FormItem>

                                <FormItem label="资历" prop="qualification_type_id">
                                    <Select v-model="formItem.qualification_type_id">
                                        <Option v-for="item in qualificationTypeList" :value="item.qualification_type_id" :key="item.qualification_type_id">{{ item.qualification_type_name }}</Option>
                                    </Select>
                                </FormItem>

                                <FormItem label="咨询方式" prop="manner_type_id">
                                    <Select v-model="formItem.manner_type_id">
                                        <Option v-for="item in mannerTypeList" :value="item.manner_type_id" :key="item.manner_type_id">{{ item.manner_type_name }}</Option>
                                    </Select>
                                </FormItem>

                                <FormItem label="等级" prop="level_type_id">
                                    <Select v-model="formItem.level_type_id">
                                        <Option v-for="item in levelTypeList" :value="item.level_type_id" :key="item.level_type_id">{{ item.level_type_name }}</Option>
                                    </Select>
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
                schoolTypeList:[],
                qualificationTypeList:[],
                mannerTypeList:[],
                levelTypeList:[],
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
                    identification_no: [
                        {required: true, message: "身份证号不能为空", trigger: "blur"}
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
                    school_type_id: [
                        {required: true, message: "流派不能为空", trigger: "change",type:"string"}
                    ],
                    qualification_type_id: [
                        {required: true, message: "资历不能为空", trigger: "change",type:"string"}
                    ],
                    manner_type_id: [
                        {required: true, message: "线上线下不能为空", trigger: "change",type:"string"}
                    ],
                    level_type_id: [
                        {required: true, message: "等级不能为空", trigger: "change",type:"string"}
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

            this.getSchoolTypeList()
            this.getMannerTypeList()
            this.getQualificationTypeList()
            this.getLevelTypeList()
        },
        methods: {
            getSchoolTypeList(){
                this.http.post('appoint_wx/schooltype/list', {}).then((data) => {

                    this.schoolTypeList = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            getLevelTypeList(){
                this.http.post('appoint_wx/leveltype/list', {}).then((data) => {

                    this.levelTypeList = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            getQualificationTypeList(){
                this.http.post('appoint_wx/qualificationtype/list', {}).then((data) => {

                    this.qualificationTypeList = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            getMannerTypeList(){
                this.http.post('appoint_wx/mannertype/list', {}).then((data) => {

                    this.mannerTypeList = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
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

                        if(!Util.isValidID(this.formItem.identification_no)){
                            this.$Message.warning("请输入合法的身份证号！")
                            return;
                        }

                        this.http.post('appoint_wx/login/register', this.formItem).then((data) => {
                            this.$Message.success("注册成功，请登录！")

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
        /*top: 20%;*/
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
