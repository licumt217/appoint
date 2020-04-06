<template>


    <div>

        <Card style="width:780px;margin:2em auto;">
            <p slot="title">
                咨询师收费设置
            </p>
            <Row>
                <Form :model="feeSet" :rules='rules' ref='form' :label-width="180">
                    <FormItem label="收费方式" prop="fee_type">
                        <Select v-model="feeSet.fee_type">
                            <Option v-for="item in FEE_TYPE_LIST" :value="item.key"
                                    :key="item.key">{{ item.desc }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="每个时段费用（元）" prop="fee">
                        <Input v-model="feeSet.fee" placeholder="请输入费用"></Input>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="save()">保存</Button>
                    </FormItem>

                </Form>

            </Row>


        </Card>


    </div>


</template>

<script>
    import {Util} from '../../assets/js/Util'
    import {Room} from '../../assets/models/Room'
    import {FEE_TYPE_LIST} from "../../assets/js/constants/constant";

    export default {
        components: {},
        data() {
            return {
                FEE_TYPE_LIST,
                feeSet: {},
                pageSize: Util.pageSize,
                currentPage: 1,
                rules: {
                    fee_type: [
                        {required: true, message: "收费方式不能为空", trigger: "change", type: 'number'}
                    ],
                    fee: [
                        {required: true, message: "每个时段费用不能为空", trigger: "blur"}
                    ],

                },

            }
        },
        mounted() {
            this.init()


        },
        methods: {
            init() {
                this.getFeeSet()
            },
            getFeeSet() {
                let url = 'appoint_wx/therapistFeeSet/getByTherapistId';

                this.http.post(url, {
                    therapist_id: sessionStorage.user_id
                }).then((data) => {

                    console.log(JSON.stringify(data))


                    if (data) {
                        this.feeSet = data;
                    }

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            save() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (Number.isNaN(Number(this.feeSet.fee))) {
                            this.$Message.warning('请输入合法的数字！')
                        } else {

                            let url = 'appoint_wx/therapistFeeSet/add';

                            if (this.feeSet.therapist_fee_set_id) {
                                url = 'appoint_wx/therapistFeeSet/update';
                            }

                            let obj = {
                                therapist_fee_set_id: this.feeSet.therapist_fee_set_id,
                                therapist_id: sessionStorage.user_id,
                            }

                            this.feeSet.fee = Number(this.feeSet.fee).toFixed(2)

                            Object.assign(obj, this.feeSet)

                            this.http.post(url, obj).then((data) => {

                                this.$Message.success('设置成功！')
                                this.init();

                            }).catch(err => {
                                this.$Message.error(err)
                            })
                        }
                    }

                })

            },
        }
    }
</script>

<style scoped>
</style>
