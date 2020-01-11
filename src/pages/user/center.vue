<template>


    <div>

        <Card style="width:780px;margin:2em auto;">
            <p slot="title">
                用户操作
            </p>

            <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="80" class="demo-ruleForm">

                <Form-item prop="phone" label="手机号">
                    <Input :maxlength="11" placeholder="请输入手机号" v-model="formItem.phone"></Input>
                </Form-item>

                <Form-item prop="name" label="姓名">
                    <Input placeholder="请输入姓名" v-model="formItem.name"></Input>
                </Form-item>

                <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="formItem.gender">
                        <Radio label="male">男</Radio>
                        <Radio label="female">女</Radio>
                    </RadioGroup>
                </FormItem>

                <Form-item prop="email" label="电子邮箱">
                    <Input :maxlength="30" placeholder="请输入电子邮箱" v-model="formItem.email"></Input>
                </Form-item>

                <FormItem label="出生日期" prop="birthday">
                    <DatePicker type="date" placeholder="请选择出生日期" v-model="formItem.birthday"
                                placement="top"></DatePicker>
                </FormItem>

            </Form>

            <div style="margin-top: 2em;text-align: center">
                <Button type="primary" @click="operate">修改</Button>
            </div>


        </Card>


    </div>


</template>

<script>
    const md5 = require('md5')
    import {Util} from '../../assets/js/Util'

    export default {
        data() {
            return {
                isEdit: this.$route.query.opType === 'edit',
                user_id: this.$route.query.user_id,
                formItem: {},
                rules: {
                    phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur"},
                        {type: 'string', min: 11, message: '手机号长度不能少于11位', trigger: 'blur'}
                    ],
                    gender: [
                        {required: true, message: "性别不能为空", trigger: "change"}
                    ],
                    birthday: [
                        {required: true, type: "date", message: "出生日期不能为空", trigger: "change"}
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

            this.http.post('appoint_wx/user/getById').then((data) => {

                this.formItem = data;


            }).catch(err => {
                this.$Message.error(err)
            })
        },
        methods: {
            back() {
                this.$router.push('/user/list')
            },
            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        let url = 'appoint_wx/user/update'

                        if (!Util.isValidPhone(this.formItem.phone)) {
                            this.$Message.warning("请输入合法的手机号！")
                            return;
                        }

                        if (!Util.isValidEmail(this.formItem.email)) {
                            this.$Message.warning("请输入合法的电子邮箱！")
                            return;
                        }


                        this.http.post(url, this.formItem).then((data) => {

                            this.$Message.success("修改成功！")


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

</style>
