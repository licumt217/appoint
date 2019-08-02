<template>


    <div>

        <Row style="padding:5px;">
            <Col span="24">
                <HeaderName border name="咨询师收益"></HeaderName>
            </Col>
        </Row>
        <Row style="padding:5px">
            <Col span="24">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline >

                    <FormItem prop="name" label="姓名" :label-width="50">
                        <Input type="text" v-model="formInline.name" placeholder="姓名">
                        </Input>
                    </FormItem>

                    <FormItem label="收益时间" :label-width="60">
                        <Row>
                            <Col span="11">
                                <DatePicker type="date" placeholder="" v-model="formInline.startDate"></DatePicker>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <DatePicker type="date" placeholder="" v-model="formInline.endDate"></DatePicker>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" icon="ios-search" @click="getList(1)">查询</Button>
                    </FormItem>

                </Form>

            </Col>

        </Row>

        <Table stripe :columns="columns" :data="dataList"></Table>
        <div style="text-align: center;margin-top: 1em;">
            <Page :total="count" :page-size="pageSize" :current="currentPage" @on-change="pageChange"/>
        </div>

    </div>


</template>

<script>
    import {Util} from '../../assets/js/Util'
    import {TherapistRevenue} from "../../assets/models/TherapistRevenue";
    export default {
        components:{
        },
        data() {
            return {
                formInline: {},
                ruleInline: {},
                columns: [
                    {
                        type:'index',
                        width:60,
                        align:'center',
                        indexMethod:(params)=>{
                            return (this.currentPage-1)*Util.pageSize+(params._index+1);
                        }
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '收益时间',
                        key: 'date'
                    },
                    {
                        title: '收益',
                        key: 'revenue'
                    },

                ],
                count:0,
                totalPages:0,
                pageSize:Util.pageSize,
                currentPage:1,
                dataList: [],
            }
        },
        mounted() {
            this.getList(1)

        },
        methods: {

            pageChange(page){
              this.getList(page)
            },
            getList(currentPage) {

                let data= TherapistRevenue.getList();

                if(data){
                    this.count=data.length;
                    this.totalPages=data.length/10;
                    this.currentPage=1;

                    this.dataList = data;
                }


                return;

                this.http.post('user/list', {
                    currentPage:currentPage,
                    pageSize:this.pageSize,
                }).then(data => {

                    this.count=data.count;
                    this.totalPages=data.totalPages;
                    this.currentPage=data.currentPage;

                    this.dataList = data.data;
                })
            },
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
