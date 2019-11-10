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

                        <template v-if="role===Role.admin">

                            <MenuItem name="divisionManager">
                                <Icon type="ios-navigate"></Icon>
                                分部管理员管理
                            </MenuItem>

                            <MenuItem name="caseManager">
                                <Icon type="ios-navigate"></Icon>
                                案例管理员管理
                            </MenuItem>

                            <MenuItem name="therapist">
                                <Icon type="ios-navigate"></Icon>
                                咨询师管理
                            </MenuItem>

                            <MenuItem name="therapistRevenue">
                                <Icon type="ios-navigate"></Icon>
                                咨询师收益查看
                            </MenuItem>

                            <MenuItem name="blackList">
                                <Icon type="ios-navigate"></Icon>
                                黑名单管理
                            </MenuItem>

                            <MenuItem name="ethicsNotice">
                                <Icon type="ios-navigate"></Icon>
                                伦理公告
                            </MenuItem>

                            <MenuItem name="preCheck">
                                <Icon type="ios-navigate"></Icon>
                                预检表
                            </MenuItem>

                            <Submenu name="complain">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    投诉管理
                                </template>
                                <MenuItem name="userComplain">用户投诉咨询师管理</MenuItem>
                                <MenuItem name="therapistComplain">咨询师投诉用户管理</MenuItem>
                            </Submenu>


                            <Submenu name="setting">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    设置
                                </template>
                                <MenuItem name="userList">用户管理</MenuItem>
                                <MenuItem name="passModify">修改密码</MenuItem>
                                <MenuItem name="logout" >退出登录</MenuItem>
                            </Submenu>
                        </template>

                        <template v-if="role===Role.caseManager">

                            <MenuItem name="therapist">
                                <Icon type="ios-navigate"></Icon>
                                咨询师管理
                            </MenuItem>

                            <MenuItem name="therapistLevel">
                                <Icon type="ios-navigate"></Icon>
                                咨询师等级管理
                            </MenuItem>

                            <MenuItem name="therapistRevenue">
                                <Icon type="ios-navigate"></Icon>
                                咨询师收益查看
                            </MenuItem>

                            <MenuItem name="blackList">
                                <Icon type="ios-navigate"></Icon>
                                黑名单管理
                            </MenuItem>

                            <MenuItem name="ethicsNotice">
                                <Icon type="ios-navigate"></Icon>
                                伦理公告
                            </MenuItem>

                            <MenuItem name="preCheck">
                                <Icon type="ios-navigate"></Icon>
                                预检表
                            </MenuItem>

                            <MenuItem name="room">
                                <Icon type="ios-navigate"></Icon>
                                房间
                            </MenuItem>

                            <Submenu name="complain">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    投诉管理
                                </template>
                                <MenuItem name="userComplain">用户投诉咨询师管理</MenuItem>
                                <MenuItem name="therapistComplain">咨询师投诉用户管理</MenuItem>
                            </Submenu>


                            <Submenu name="setting">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    设置
                                </template>
                                <MenuItem name="userList">用户管理</MenuItem>
                                <MenuItem name="passModify">修改密码</MenuItem>
                                <MenuItem name="logout" >退出登录</MenuItem>
                            </Submenu>
                        </template>

                        <template v-if="role!=='1'">
<!--                            <MenuItem name="statistics">-->
<!--                                <Icon type="ios-navigate"></Icon>-->
<!--                                数据导出-->
<!--                            </MenuItem>-->
<!--                            <Submenu name="7">-->
<!--                                <template slot="title">-->
<!--                                    <Icon type="ios-stats"/>-->
<!--                                    用户管理-->
<!--                                </template>-->
<!--                                <MenuItem name="userList">用户管理</MenuItem>-->
<!--                                <MenuItem name="passModify">修改密码</MenuItem>-->
<!--                                <MenuItem name="logout" >退出登录</MenuItem>-->
<!--                            </Submenu>-->
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
    import Role from './assets/js/Role'
    export default {
        name: 'app',
        data() {
            return {
                Role,
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

                if (!this.isLogin) {
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
              return   Number(this.$store.state.role);
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

                    case 'therapistComplain':
                        this.$router.push('/complain/therapistList')
                        break;

                    case 'userComplain':
                        this.$router.push('/complain/userList')
                        break;

                    case 'therapistRevenue':
                        this.$router.push('/therapist/revenueList')
                        break;

                    case 'therapistLevel':
                        this.$router.push('/therapist/levelList')
                        break;

                    case 'therapist':
                        this.$router.push('/therapist/list')
                        break;

                    case 'caseManager':
                        this.$router.push('/caseManager/list')
                        break;

                    case 'divisionManager':
                        this.$router.push('/divisionManager/list')
                        break;
                    case 'blackList':
                        this.$router.push('/blackList/list')
                        break;
                    case 'ethicsNotice':
                        this.$router.push('/ethicsNotice/list')
                        break;
                    case 'preCheck':
                        this.$router.push('/preCheck/list')
                        break;
                    case 'room':
                        this.$router.push('/room/list')
                        break;






                }

            },
            go2UserDetail(){
                this.$router.push('/user/detail')
            }

        },
        mounted() {

            //相关信息存缓存



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
