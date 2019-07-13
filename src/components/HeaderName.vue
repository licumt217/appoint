<template>
    <Row :class="{'border':border}">
        <Breadcrumb style="padding:.4em;">
            <BreadcrumbItem >{{name}}</BreadcrumbItem>
        </Breadcrumb>

    </Row>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            name:{
                type:String,
                default:''
            },
            border:{
                type:Boolean,
                default: false
            }
        },
        computed:{
        },
        methods: {


        }
    }
</script>

<style>
    .border{
        border-bottom:1px solid #e8eaec;
    }
</style>


