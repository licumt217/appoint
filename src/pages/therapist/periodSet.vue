<template>


    <div>

        <Row style="padding:5px;">
            <Col span="20">
                <HeaderName name="咨询师可用时段设置"></HeaderName>
            </Col>
            <Col span="4">
                <Button type="primary" @click="useablePeriodSet()">可用时段设置</Button>
            </Col>
        </Row>

        <UseablePeriodSet ref="useablePeriodSet"></UseablePeriodSet>
    </div>


</template>

<script>
    import {Util} from '../../assets/js/Util'
    import {Room} from '../../assets/models/Room'
    import UseablePeriodSet from './components/UseablePeriodSet'
    import Role from '../../assets/js/Role'

    export default {
        components: {
            UseablePeriodSet
        },
        data() {
            return {
                total: 0,
                pageSize: Util.pageSize,
                currentPage: 1,
            }
        },
        mounted() {
            this.init()


        },
        methods: {
            init() {
            },
            useablePeriodSet() {
                this.$refs.useablePeriodSet.show()
            },
            onOff(params) {

                let url = 'appoint_wx/room/onOff';

                this.http.post(url, params.row).then((data) => {

                    this.$Message.success("操作成功！")
                    this.init()


                }).catch(err => {
                    this.$Message.error(err)
                })


            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
