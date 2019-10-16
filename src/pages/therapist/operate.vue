<template>


    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" >

                <div class="ms-login" style="overflow: initial">

                    <Tabs style="overflow: initial">
                        <Tab-pane label="咨询师操作" name="account" icon="android-person">

                            <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="80" class="demo-ruleForm">

                                <Form-item prop="name" label="姓名">
                                    <Input  :maxlength="20" placeholder="请输入姓名" v-model="formItem.name"></Input>
                                </Form-item>

                                <Form-item prop="phone" label="手机号">
                                    <Input  :maxlength="11" placeholder="请输入手机号" v-model="formItem.phone"></Input>
                                </Form-item>

                                <FormItem label="性别" prop="sex">
                                    <RadioGroup v-model="formItem.sex">
                                        <Radio label="male" >男</Radio>
                                        <Radio label="female" >女</Radio>
                                    </RadioGroup>
                                </FormItem>

                                <Form-item prop="email" label="电子邮箱">
                                    <Input  :maxlength="30" placeholder="请输入电子邮箱" v-model="formItem.email"></Input>
                                </Form-item>

                                <FormItem label="出生日期" prop="birthday" >
                                    <DatePicker type="date" placeholder="请选择出生日期" v-model="formItem.birthday" placement="bottom"></DatePicker>
                                </FormItem>

                                <FormItem label="流派" prop="school">
                                    <Select v-model="formItem.school">
                                        <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                    </Select>
                                </FormItem>

                                <FormItem label="资历" prop="qualification">
                                    <Select v-model="formItem.qualification">
                                        <Option v-for="item in qualificationList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                    </Select>
                                </FormItem>

                                <FormItem label="线上线下" prop="manner">
                                    <Select v-model="formItem.manner">
                                        <Option v-for="item in mannerList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                    </Select>
                                </FormItem>

                                <FormItem label="等级" prop="level">
                                    <Select v-model="formItem.level">
                                        <Option v-for="item in levelList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                    </Select>
                                </FormItem>

                            </Form>

                        </Tab-pane>
                    </Tabs>

                    <div class="login-btn">
                        <Button type="primary" @click="operate">确定</Button>
                    </div>
                    <div class="signup-btn">
                        <a href="javascript:" @click="back">返回</a>
                    </div>
                    <!--<Spin size="large" fix ></Spin>-->
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    const md5=require('md5')
    import {Util} from '../../assets/js/Util'
    import {Therapist} from '../../assets/models/Therapist'
    import {Level} from '../../assets/models/Level'
    export default {
        data() {
            return {
                schoolList:[{
                    id:1,
                    name:'古典流派'
                },{
                    id:2,
                    name:'现代流派'
                }],
                qualificationList:[{
                    id:1,
                    name:'老资历'
                },{
                    id:2,
                    name:'新资历'
                }],
                mannerList:[{
                    id:1,
                    name:'线上'
                },{
                    id:2,
                    name:'线下'
                }],
                levelList:[],
                isEdit:this.$route.query.opType==='edit',
                userId:this.$route.query.userId,
                formItem: {
                },
                rules: {
                    name: [
                        {required: true, message: "姓名不能为空", trigger: "blur"}
                    ],
                    phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur"},
                        {type: 'string', min: 11, message: '手机号长度不能少于11位', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: "性别不能为空", trigger: "change"}
                    ],
                    birthday: [
                        {required: true, type:"date",message: "出生日期不能为空", trigger: "change"}
                    ],
                    email: [
                        {required: true, message: "电子邮箱不能为空", trigger: "blur"}
                    ],
                    school: [
                        {required: true, message: "流派不能为空", trigger: "change",type:"number"}
                    ],
                    qualification: [
                        {required: true, message: "资历不能为空", trigger: "change",type:"number"}
                    ],
                    manner: [
                        {required: true, message: "线上线下不能为空", trigger: "change",type:"number"}
                    ],
                    level: [
                        {required: true, message: "等级不能为空", trigger: "change"}
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
            this.getLevelList();

            if(this.isEdit){

                this.formItem=JSON.parse(this.$route.query.formItem);

            }
        },
        methods: {
            getLevelList(){
                this.levelList=Level.getList()
            },
            back(){
                this.$router.push('/therapist/list')
            },
            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        let url='user/add';
                        if(this.isEdit){
                            url='user/update'
                        }

                        if(!Util.isValidPhone(this.formItem.phone)){
                            this.$Message.warning("请输入合法的手机号！")
                            return;
                        }

                        if(!Util.isValidEmail(this.formItem.email)){
                            this.$Message.warning("请输入合法的电子邮箱！")
                            return;
                        }

                        if(this.isEdit){
                            Therapist.update(this.formItem)
                            this.$Message.success("修改成功！")
                        }else{
                            Therapist.add(this.formItem)
                            this.$Message.success("新增成功！")
                        }
                        this.$router.push('/therapist/list')

                        return;

                        this.http.post(url, this.formItem).then((data) => {

                            if(this.isEdit){
                                this.$Message.success("修改成功！")
                            }else{
                                this.$Message.success("新增成功！")
                            }
                            this.$router.push('/therapist/list')



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
