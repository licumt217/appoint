<template>


    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" >

                <div class="ms-login" style="overflow: initial">

                    <Tabs style="overflow: initial">
                        <Tab-pane label="预检表详情" name="account" icon="android-person">
                            <Form :label-width="80" class="demo-ruleForm">

                                <Form-item label="用户姓名">
                                    {{formItem.userId}}
                                </Form-item>

                                <Form-item label="用户手机号">
                                    {{formItem.userPhone}}
                                </Form-item>

                                <Form-item label="答题时间">
                                    {{formItem.answerDate}}
                                </Form-item>

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
    import {DivisionManager} from '../../assets/models/DivisionManager'
    export default {
        data() {
            return {
                isEdit:this.$route.query.opType==='edit',
                userId:this.$route.query.userId,
                formItem: {
                },
                rules: {
                    name: [
                        {required: true, message: "姓名不能为空", trigger: "blur"}
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
                this.$router.push('/divisionManager/list')
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
                            DivisionManager.update(this.formItem)
                            this.$Message.success("修改成功！")
                        }else{
                            DivisionManager.add(this.formItem)
                            this.$Message.success("新增成功！")
                        }
                        this.$router.push('/divisionManager/list')

                        return;


                        this.http.post(url, this.formItem).then((data) => {

                            if(this.isEdit){
                                this.$Message.success("修改成功！")
                            }else{
                                this.$Message.success("新增成功！")
                            }
                            this.$router.push('/divisionManager/list')



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
