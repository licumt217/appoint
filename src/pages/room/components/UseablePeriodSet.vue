<template>
    <Modal
            v-model="isShow"
            title="房间可用时段设置"
            width="50%"
            :mask-closable="false"
    >
        <Row style="">
            <CheckboxGroup v-model="period">
                <template v-for="(item,index) in allList">
                    <template v-if="index%8===0">
                        <br/>
                    </template>
                    <Checkbox :label="item" :key="item" style="min-width: 8em;margin-bottom: 1em;">
                        <span>{{index}}</span>
                    </Checkbox>

                </template>

            </CheckboxGroup>
        </Row>
        <div slot="footer">
            <Button  type="success" size="large" @click="ok">确定</Button>
            <Button type="text" size="large" @click="isShow=false">关闭</Button>
        </div>
    </Modal>
</template>

<script>
    import DateUtil from '../../../assets/js/DateUtil'
    import {Util} from '../../../assets/js/Util'
    export default {
        name: '',
        data() {
            return {
                isShow:false,
                period:[],
                allList:['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
            }
        },
        props: {
        },
        computed: {},
        watch:{

        },
        methods: {
            show(){
                this.isShow=true;

                this.getSet()

            },
            ok(){


                this.http.post('appoint_wx/room/updateUseablePeriodSet', {
                    period:this.period.join(',')
                }).then((data) => {
                    this.$Message.success('设置成功！')
                    this.isShow=false;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            getSet(){
                this.http.post('appoint_wx/room/getUseablePeriodSet', {
                }).then((data) => {
                    this.period=data.period.split(',')

                }).catch(err => {
                    this.$Message.error(err)
                })
            }
        }
    }
</script>

