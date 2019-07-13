<template>
    <div class="layout" :class="{'layout_notlogin':!isLogin}">
        <div class="login" v-if="!isLogin">
            <router-view></router-view>
        </div>
        <Layout :class="{'layout_notlogin':!isLogin}" v-else style="background: #FFF">
            <Header :style="{position: 'fixed', top:'0',width: '100%' ,zIndex:10}" v-show="isLogin">
                <Menu mode="horizontal" theme="dark" active-name="1" @on-select="operate" style="">
                    <!--<div class="layout-logo" >-->
                    <!--</div>-->
                    <div class="layout-nav" style="float: right">

                        <template v-if="role==='0'">
                            <MenuItem name="measure">
                                <Icon type="ios-navigate"></Icon>
                                量表管理
                            </MenuItem>
                            <MenuItem name="paper">
                                <Icon type="ios-navigate"></Icon>
                                问卷管理
                            </MenuItem>
                            <MenuItem name="statistics">
                                <Icon type="ios-navigate"></Icon>
                                数据导出
                            </MenuItem>
                            <Submenu name="7">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    用户管理
                                </template>
                                <MenuItem name="userGroupList">用户组管理</MenuItem>
                                <MenuItem name="userList">用户管理</MenuItem>
                                <MenuItem name="administratorList">区域管理员管理</MenuItem>
                                <MenuItem name="passModify">修改密码</MenuItem>
                                <MenuItem name="logout" >退出登录</MenuItem>
                            </Submenu>
                        </template>

                        <template v-if="role==='1'">
                            <MenuItem name="statistics">
                                <Icon type="ios-navigate"></Icon>
                                数据导出
                            </MenuItem>
                            <Submenu name="7">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    用户管理
                                </template>
                                <MenuItem name="userList">用户管理</MenuItem>
                                <MenuItem name="passModify">修改密码</MenuItem>
                                <MenuItem name="logout" >退出登录</MenuItem>
                            </Submenu>
                        </template>



                    </div>
                </Menu>
            </Header>

            <Content :style="{margin: '88px 20px 0', background: '#fff'}" >
                <router-view></router-view>
            </Content>

<!--            <Footer class="layout-footer-center" v-show="isLogin"></Footer>-->

            <Pass ref="pass" :isShow="isShowPassModifyModal"></Pass>


        </Layout>
    </div>
</template>

<script>
    import Pass from './components/PasswordModify'
    export default {
        name: 'app',
        data() {
            return {
                isCollapsed: false,
                isShowPassModifyModal:false,
            }
        },
        components:{
          Pass
        },
        watch: {
            $route (to, from) {
                console.log(to.path)

                if (!this.isLogin && to.path !== '/user/register') {
                    this.$router.push('/user/login')
                }
                //
                //
                //
                // if (to.path === '/login' || to.path === '/user/register') {
                //     // this.isLogin = true
                // } else {
                //     // $('.layout').show()
                //     // this.isLogin = false
                // }
            },
        },
        computed: {
            role(){
              return   this.$store.state.question_role;
            },

            menuList(){
                return this.$store.state.menuList;
            },
            activeMenuName(){
                return this.$store.state.activeMenuName;
            },
            username(){
                return this.$store.state.username;
            },
            isLogin() {
                return this.$store.state.isLogin;
            },
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            selectMenu(activeName){
                // console.log(e)
                // this.$router.push(e)
                // console.log(activeName)

                // this.$nextTick(()=>{
                //     setTimeout(()=>{
                        this.$router.push(activeName)
                    // },5000)
                // })
            },

            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },

            operate(name){

                switch (name) {
                    case 'logout':

                        sessionStorage.clear()
                        this.$store.commit('reset')
                        this.$router.push('/user/login')

                        break;

                    case 'passModify':
                        this.$refs.pass.show();
                        break;

                    case 'detail':
                        this.$router.push('/user/detail')
                        break;

                    case 'administratorList':
                        this.$router.push('/user/administratorList')
                        break;

                    case 'userList':
                        this.$router.push('/user/list')
                        break;

                    case 'userGroupList':
                        this.$router.push('/userGroup/list')
                        break;

                    case 'statistics':
                        this.$router.push('/statistics/list')
                        break;

                    case 'paper':
                        this.$router.push('/paper/list')
                        break;

                    case 'measure':
                        this.$router.push('/measure/list')
                        break;

                }

            },
            go2UserDetail(){
                this.$router.push('/user/detail')
            }

        },
        mounted() {




        }
    }
</script>

<style>
    body {
        /*overflow: hidden;*/
    }


    .layout_notlogin {
        border: none!important;
        background: #fff !important;
    }

    /*.layout-header-bar {*/
        /*background: #fff !important;*/
        /*box-shadow: 0 1px 1px rgba(0, 0, 0, .1);*/
    /*}*/

    /*.layout-logo-left {*/
        /*width: 90%;*/
        /*height: 30px;*/
        /*background: #5b6270;*/
        /*border-radius: 3px;*/
        /*margin: 15px auto;*/
    /*}*/

    /*.menu-icon {*/
        /*transition: all .3s;*/
    /*}*/

    /*.rotate-icon {*/
        /*transform: rotate(-90deg);*/
    /*}*/

    /*.menu-item span {*/
        /*display: inline-block;*/
        /*overflow: hidden;*/
        /*width: 69px;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/
        /*vertical-align: bottom;*/
        /*transition: width .2s ease .2s;*/
    /*}*/

    /*.menu-item i {*/
        /*transform: translateX(0px);*/
        /*transition: font-size .2s ease, transform .2s ease;*/
        /*vertical-align: middle;*/
        /*font-size: 16px;*/
    /*}*/

    /*.collapsed-menu span {*/
        /*width: 0px;*/
        /*transition: width .2s ease;*/
    /*}*/

    /*.collapsed-menu i {*/
        /*transform: translateX(5px);*/
        /*transition: font-size .2s ease .2s, transform .2s ease .2s;*/
        /*vertical-align: middle;*/
        /*font-size: 22px;*/
    /*}*/

    .hidden {
        display: none;
    }
    .ivu-menu-horizontal.ivu-menu-light:after{
        width: auto!important;
    }
     /*.ivu-menu-horizontal .ivu-menu-submenu {*/
        /*float: right!important;*/
         /*display: inline-block!important;*/
    /*}*/









    .layout{
        /*border: 1px solid #d7dde4;*/
        /*background: #f5f7f9;*/
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        margin: 0 auto;
    }
    .layout-footer-center{
        text-align: center;
    }

</style>
