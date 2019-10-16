<template>


    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" >

                <div class="ms-login" style="overflow: initial">

                    <Tabs style="overflow: initial">
                        <Tab-pane label="伦理公告操作" name="account" icon="android-person">

                            <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="80" class="demo-ruleForm">

                                <FormItem label="咨询师" prop="therapistId">
                                    <Select v-model="formItem.therapistId">
                                        <Option v-for="item in therapistList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                    </Select>
                                </FormItem>

                                <Form-item prop="content" label="公告内容">
                                    <Input type="textarea" :rows="5" :maxlength="1000" placeholder="请输入公告内容" v-model="formItem.content"></Input>
                                </Form-item>

                                <Form-item prop="showManner" label="显示方式">
                                    <Select v-model="formItem.showManner">
                                        <Option :value="key" v-for="(value,key) in NOTICE_SHOW_TYPE">{{value}}</Option>
                                    </Select>
                                </Form-item>

                                <FormItem label="截止日期" prop="endDate" v-show="formItem.showManner==='2'">
                                    <DatePicker type="date" placeholder="截止日期" v-model="formItem.endDate" placement="bottom"></DatePicker>
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
    import {NOTICE_SHOW_TYPE} from "../../assets/js/constants/constant"
    import {Util} from '../../assets/js/Util'
    import {EthicsNotice} from '../../assets/models/EthicsNotice'
    import {Therapist} from '../../assets/models/Therapist'
    export default {
        data() {
            return {
                NOTICE_SHOW_TYPE:NOTICE_SHOW_TYPE,
                therapistList:[],
                isEdit:this.$route.query.opType==='edit',
                userId:this.$route.query.userId,
                formItem: {
                },
                rules: {
                    therapistId: [
                        {required: true, message: "咨询师不能为空", trigger: "change"}
                    ],
                    content: [
                        {required: true, message: "公告内容不能为空", trigger: "blur"}
                    ],
                    showManner: [
                        {required: true, message: "显示方式不能为空", trigger: "change"}
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
            this.getTherapistList();

            if(this.isEdit){

                this.formItem=JSON.parse(this.$route.query.formItem);

            }
        },
        methods: {
            getTherapistList(){
                this.therapistList=Therapist.getList()
            },
            back(){
                this.$router.push('/ethicsNotice/list')
            },
            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        let url='user/add';
                        if(this.isEdit){
                            url='user/update'
                        }

                        if(this.formItem.showManner==='2'){
                            if(!this.formItem.endDate){
                                this.$Message.warning("截止日期不能为空！")
                                return;
                            }
                        }

                        if(this.isEdit){
                            EthicsNotice.update(this.formItem)
                            this.$Message.success("修改成功！")
                        }else{
                            EthicsNotice.add(this.formItem)
                            this.$Message.success("新增成功！")
                        }
                        this.$router.push('/ethicsNotice/list')

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
        margin-left: -250px;
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
        width: 500px;
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
