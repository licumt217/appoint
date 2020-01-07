<template>

    <div style="min-height: 350px;">
        <Row style="padding:5px;">
            <Col span="24">
                <HeaderName border name="房间可用设置"></HeaderName>
            </Col>
        </Row>
        <Row style="padding:5px">
            <Col span="24">
                <Form ref="formInline" inline>

                    <FormItem label="月份" :label-width="60">
                        <DatePicker type="month" placeholder="" v-model="queryDate"></DatePicker>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" icon="ios-search" @click="query">查询</Button>
                    </FormItem>

                </Form>
            </Col>

        </Row>

        <RoomUseableSet :date="date" :room_id="room_id"></RoomUseableSet>
    </div>


</template>

<script>
    import {Util} from '../../assets/js/Util'
    import RoomUseableSet from './components/RoomUseableSet'

    export default {
        components: {
            RoomUseableSet
        },
        data() {
            return {
                room_id: this.$route.query.room_id,
                queryDate:'',
                date: new Date(),
            }
        },
        computed: {
        },
        watch: {},
        mounted() {

        },
        methods: {

            query() {
                if (!this.queryDate) {
                    this.$Message.warning("请选择日期！")
                    return;
                }

                this.date=this.queryDate



            },

            back() {
                this.$router.push('/room/list')
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
