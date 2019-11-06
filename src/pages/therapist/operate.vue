<template>


    <div class="login-wrap">
        <Row style="padding:5px;margin-bottom: 3em;">
            <Col span="8" offset="8">
                <HeaderName name="咨询师操作"></HeaderName>
            </Col>
        </Row>
        <Row>
            <Col span="8" offset="8">
                <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="80" class="demo-ruleForm">

                    <Form-item prop="name" label="姓名">
                        <Input  :maxlength="20" placeholder="请输入姓名" v-model="formItem.name"></Input>
                    </Form-item>

                    <Form-item prop="phone" label="手机号">
                        <Input  :maxlength="11" placeholder="请输入手机号" v-model="formItem.phone"></Input>
                    </Form-item>

                    <FormItem label="性别" prop="gender">
                        <RadioGroup v-model="formItem.gender">
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

                    <FormItem label="流派" prop="schoolTypeId">
                        <Select v-model="formItem.schoolTypeId">
                            <Option v-for="item in schoolTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="资历" prop="qualificationTypeId">
                        <Select v-model="formItem.qualificationTypeId">
                            <Option v-for="item in qualificationTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="咨询方式" prop="mannerTypeId">
                        <Select v-model="formItem.mannerTypeId">
                            <Option v-for="item in mannerTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="等级" prop="levelTypeId">
                        <Select v-model="formItem.levelTypeId">
                            <Option v-for="item in levelTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
    import DateUtil from '../../assets/js/DateUtil'
    import {Level} from '../../assets/models/Level'
    import Role from '../../assets/js/Role'
    export default {
        data() {
            return {
                schoolTypeList:[],
                qualificationTypeList:[],
                mannerTypeList:[],
                levelTypeList:[],
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
                    gender: [
                        {required: true, message: "性别不能为空", trigger: "change"}
                    ],
                    birthday: [
                        {required: true, type:"date",message: "出生日期不能为空", trigger: "change"}
                    ],
                    email: [
                        {required: true, message: "电子邮箱不能为空", trigger: "blur"}
                    ],
                    schoolTypeId: [
                        {required: true, message: "流派不能为空", trigger: "change",type:"number"}
                    ],
                    qualificationTypeId: [
                        {required: true, message: "资历不能为空", trigger: "change",type:"number"}
                    ],
                    mannerTypeId: [
                        {required: true, message: "线上线下不能为空", trigger: "change",type:"number"}
                    ],
                    levelTypeId: [
                        {required: true, message: "等级不能为空", trigger: "change",type:"number"}
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

            this.getSchoolTypeList()
            this.getMannerTypeList()
            this.getQualificationTypeList()
            this.getLevelTypeList()

            if(this.isEdit){

                this.formItem=JSON.parse(this.$route.query.formItem);
                this.formItem.id=this.formItem.therapist_id;

            }
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


            back(){
                this.$router.push('/therapist/list')
            },
            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        let url='appoint_wx/user/add';
                        if(this.isEdit){
                            url='appoint_wx/user/update'
                        }

                        if(!Util.isValidPhone(this.formItem.phone)){
                            this.$Message.warning("请输入合法的手机号！")
                            return;
                        }

                        if(!Util.isValidEmail(this.formItem.email)){
                            this.$Message.warning("请输入合法的电子邮箱！")
                            return;
                        }

                        this.formItem.birthday=DateUtil.format(this.formItem.birthday)

                        this.formItem.role=Role.therapist
                        this.http.post(url, this.formItem).then((data) => {

                            this.$Message.success("操作成功！")
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
