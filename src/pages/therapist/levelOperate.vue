<template>


    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" >

                <div class="ms-login" style="overflow: initial">

                    <Tabs style="overflow: initial">
                        <Tab-pane label="咨询师等级操作" name="account" icon="android-person">

                            <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="120" class="demo-ruleForm">

                                <Form-item prop="name" label="名称">
                                    <Input  :maxlength="50" placeholder="请输入名称" v-model="formItem.name"></Input>
                                </Form-item>

                                <Form-item prop="divideRatio" label="分成比例（%）">
                                    <Input  :maxlength="30" placeholder="请输入分成比例" v-model="formItem.divideRatio"></Input>
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
    import {Level} from '../../assets/models/Level'
    export default {
        data() {
            return {
                isEdit:this.$route.query.opType==='edit',
                userId:this.$route.query.userId,
                formItem: {
                },
                rules: {
                    name: [
                        {required: true, message: "名称不能为空", trigger: "blur"}
                    ],
                    divideRatio: [
                        {required: true, message: "分成比例不能为空", trigger: "blur"}
                    ]
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

                this.formItem=this.$route.query.formItem;

            }
        },
        methods: {
            back(){
                this.$router.push('/therapist/levelList')
            },
            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        let url='user/add';
                        if(this.isEdit){
                            url='user/update'
                        }


                        if(this.isEdit){
                            Level.update(this.formItem)
                            this.$Message.success("修改成功！")
                        }else{
                            Level.add(this.formItem)
                            this.$Message.success("新增成功！")
                        }
                        this.$router.push('/therapist/levelList')

                        return;

                        this.http.post(url, this.formItem).then((data) => {

                            if(this.isEdit){
                                this.$Message.success("修改成功！")
                            }else{
                                this.$Message.success("新增成功！")
                            }
                            this.$router.push('/therapist/levelList')



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
        margin-left: -240px;
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
        width: 480px;
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
