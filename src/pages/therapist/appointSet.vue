<template>


    <div>

        <Card style="width:780px;margin:2em auto;">
            <p slot="title">
                预约配置
            </p>
            <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="80"
                  class="demo-ruleForm">

                <FormItem label="流派" prop="school_type_id">
                    <Select v-model="formItem.school_type_id">
                        <Option v-for="item in schoolTypeList" :value="item.school_type_id"
                                :key="item.school_type_id">{{ item.school_type_name }}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="资历" prop="qualification_type_id">
                    <Select v-model="formItem.qualification_type_id">
                        <Option v-for="item in qualificationTypeList"
                                :value="item.qualification_type_id" :key="item.qualification_type_id">{{
                            item.qualification_type_name }}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="咨询方式" prop="manner_type_id">
                    <Select v-model="formItem.manner_type_id">
                        <Option v-for="item in mannerTypeList" :value="item.manner_type_id"
                                :key="item.manner_type_id">{{ item.manner_type_name }}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="等级" prop="level_type_id">
                    <Select v-model="formItem.level_type_id">
                        <Option v-for="item in levelTypeList" :value="item.level_type_id"
                                :key="item.level_type_id">{{ item.level_type_name }}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="紧急咨询" prop="emergency">
                    <Select v-model="formItem.emergency">
                        <Option :value="0"> 不接受</Option>
                        <Option :value="1"> 接受</Option>
                    </Select>
                </FormItem>

            </Form>
            <div style="text-align: center">
                <Button type="primary" size="large"  @click="operate">确定</Button>
            </div>
        </Card>

    </div>

</template>

<script>
    import {Util} from '../../assets/js/Util'

    export default {
        data() {
            return {
                schoolTypeList: [],
                qualificationTypeList: [],
                mannerTypeList: [],
                levelTypeList: [],
                formItem: {},
                rules: {
                    school_type_id: [
                        {required: true, message: "流派不能为空", trigger: "change", type: "string"}
                    ],
                    qualification_type_id: [
                        {required: true, message: "资历不能为空", trigger: "change", type: "string"}
                    ],
                    manner_type_id: [
                        {required: true, message: "线上线下不能为空", trigger: "change", type: "string"}
                    ],
                    level_type_id: [
                        {required: true, message: "等级不能为空", trigger: "change", type: "string"}
                    ],
                    emergency: [
                        {required: true, message: "紧急咨询不能为空", trigger: "change", type: 'number'}
                    ],
                },
            }
        },
        computed: {},
        mounted() {
            this.init()

        },
        methods: {

            init() {
                this.getSchoolTypeList()
                this.getMannerTypeList()
                this.getQualificationTypeList()
                this.getLevelTypeList()
                this.getSet()
            },
            back() {
                this.$router.push('/user/list')
            },

            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        this.formItem.therapist_id = sessionStorage.user_id;


                        this.http.post(`appoint_wx/therapistAttachRelation/update`, this.formItem).then((data) => {

                            this.$Message.success("操作成功！")
                            this.init();


                        }).catch(err => {
                            this.$Message.error(err)
                        })

                    }

                })

            },

            getSet() {
                this.http.post('appoint_wx/therapistAttachRelation/getByTherapistId', {
                    therapist_id: sessionStorage.user_id
                }).then((data) => {

                    this.formItem = data;


                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            getSchoolTypeList() {
                this.http.post('appoint_wx/schooltype/list', {}).then((data) => {

                    this.schoolTypeList = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            getLevelTypeList() {
                this.http.post('appoint_wx/leveltype/list', {}).then((data) => {

                    this.levelTypeList = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            getQualificationTypeList() {
                this.http.post('appoint_wx/qualificationtype/list', {}).then((data) => {

                    this.qualificationTypeList = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            getMannerTypeList() {
                this.http.post('appoint_wx/mannertype/list', {}).then((data) => {

                    this.mannerTypeList = data;

                }).catch(err => {
                    this.$Message.error(err)
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
        margin-left: -290px;
    }


    .ms-login {
        width: 580px;
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


    .login-btn button {
        width: 100%;
        height: 36px;
    }


</style>
