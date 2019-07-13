<template>


    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" >

                <div class="ms-login" style="overflow: initial">

                    <Tabs style="overflow: initial">
                        <Tab-pane label="用户操作" name="account" icon="android-person">

                            <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="80" class="demo-ruleForm" >

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

                                <FormItem label="用户组" prop="userGroup">

                                    <Select v-model="formItem.userGroup" placement="top" multiple>
                                        <Option :value="item.id" v-for="item in userGroupList">{{item.name}}</Option>
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
                isEdit:this.$route.query.opType==='edit',
                formItem: {
                    userGroup:[]
                },
                rules: {
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
                    userGroup: [
                        {required: true,type:"array", message: "用户组不能为空", trigger: "change"}
                    ],
                },
                userGroupList:[]
            }
        },
        mounted() {
            if(this.isEdit){


                this.formItem=JSON.parse(sessionStorage.curCommonAdmin);

                this.formItem.userGroup.forEach(item=>{
                    this.formItem.userGroup.push(item.id)
                })
            }

            this.getUserGroupList()
        },
        methods: {
            getUserGroupList(currentPage) {
                let params={}

                if(this.isEdit){
                    params.userId=this.formItem.id;
                }

                this.http.post('user/getAllGroup', params).then(data => {

                    this.userGroupList = data.data;
                })
            },
            back(){
                this.$router.push('/user/administratorList')
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

                        let temp={
                            phone:this.formItem.phone,
                            sex:this.formItem.sex,
                            email:this.formItem.email,
                            birthday:this.formItem.birthday,
                            userGroup:JSON.stringify(this.formItem.userGroup),
                            role:'1'

                        }

                        if(this.isEdit){
                            temp.id=this.formItem.id
                        }

                        this.$Message.warning("操作中，请稍等！")

                        this.http.post(url, temp).then((data) => {

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
