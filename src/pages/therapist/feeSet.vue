<template>


    <div>

        <Card style="width:780px;margin:2em auto;">
            <p slot="title">
                咨询师收费设置
            </p>

            <Row>
                每个时段金额：
                <Input style="width:10em;" v-model="feeSet.fee"></Input> 元
            </Row>

            <div style="margin-top: 3em">
                <Button type="primary" @click="save()">保存</Button>
            </div>


        </Card>


    </div>


</template>

<script>
    import {Util} from '../../assets/js/Util'
    import {Room} from '../../assets/models/Room'

    export default {
        components: {},
        data() {
            return {
                feeSet: {},
                pageSize: Util.pageSize,
                currentPage: 1,
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
                if (!this.feeSet.fee) {
                    this.$Message.warning('请输入收费设置！')
                } else if (Number.isNaN(Number(this.feeSet.fee))) {
                    this.$Message.warning('请输入合法的数字！')
                } else {
                    let url = 'appoint_wx/therapistFeeSet/add';

                    if (this.feeSet.therapist_fee_set_id) {
                        url = 'appoint_wx/therapistFeeSet/update';
                    }

                    this.http.post(url, {
                        therapist_fee_set_id: this.feeSet.therapist_fee_set_id,
                        therapist_id: sessionStorage.user_id,
                        fee: this.feeSet.fee
                    }).then((data) => {

                        this.$Message.success('设置成功！')
                        this.init();

                    }).catch(err => {
                        this.$Message.error(err)
                    })
                }
            },
        }
    }
</script>

<style scoped>
</style>
