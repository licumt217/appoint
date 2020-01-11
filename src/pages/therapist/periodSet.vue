<template>


    <div>

        <Card style="width:780px;margin:2em auto;">
            <p slot="title">
                咨询师可用时段设置
            </p>
            <Row style="">
                <CheckboxGroup v-model="period">
                    <template v-for="(item,index) in allList">
                        <template v-if="index%6===0">
                            <br/>
                        </template>
                        <Checkbox :label="item" :key="item" style="min-width: 9em;margin-bottom: 3em;">
                            <span>{{index}}</span>
                        </Checkbox>

                    </template>

                </CheckboxGroup>
            </Row>
            <div style="text-align: center">
                <Button type="primary" size="large" @click="ok">确定</Button>
            </div>
        </Card>



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
                period:[],
                allList:['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
            }
        },
        mounted() {
            this.init()


        },
        methods: {
            init() {
                this.getSet()
            },

            ok(){


                this.http.post('appoint_wx/therapist/updateUseablePeriodSet', {
                    period:this.period.join(','),
                }).then((data) => {
                    this.$Message.success('设置成功！')
                    this.isShow=false;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            getSet(){
                this.http.post('appoint_wx/therapist/getUseablePeriodSet', {
                    therapist_id:sessionStorage.user_id
                }).then((data) => {
                    this.period=data.period.split(',')

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
