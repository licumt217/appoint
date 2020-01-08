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

                            <MenuItem name="division">
                                <Icon type="ios-navigate"></Icon>
                                分部管理
                            </MenuItem>

                            <MenuItem name="ethicsNotice">
                                <Icon type="ios-navigate"></Icon>
                                伦理公告
                            </MenuItem>

                            <Submenu name="complain">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    投诉管理
                                </template>
                                <MenuItem name="userComplain">用户投诉咨询师管理</MenuItem>
                                <MenuItem name="therapistComplain">咨询师投诉用户管理</MenuItem>
                            </Submenu>
                            <MenuItem name="blackList">
                                <Icon type="ios-navigate"></Icon>
                                黑名单管理
                            </MenuItem>

                            <Submenu name="base">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    基础信息
                                </template>
                                <MenuItem name="level">等级设置</MenuItem>
                                <MenuItem name="manner">咨询方式设置</MenuItem>
                                <MenuItem name="qualification">资历类型设置</MenuItem>
                                <MenuItem name="school">流派设置</MenuItem>
                                <MenuItem name="consult">预约类型设置</MenuItem>
                            </Submenu>


                            <Submenu name="setting">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    个人中心
                                </template>
                                <MenuItem name="passModify">修改密码</MenuItem>
                                <MenuItem name="logout" >退出登录</MenuItem>
                            </Submenu>
                        </template>

                        <template v-if="role===Role.divisionManager">

                            <MenuItem name="station">
                                <Icon type="ios-navigate"></Icon>
                                工作室管理
                            </MenuItem>

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
                                    个人中心
                                </template>
                                <MenuItem name="passModify">修改密码</MenuItem>
                                <MenuItem name="logout" >退出登录</MenuItem>
                            </Submenu>
                        </template>

                        <template v-if="role===Role.caseManager">


                            <MenuItem name="room">
                                <Icon type="ios-navigate"></Icon>
                                房间管理
                            </MenuItem>

                            <MenuItem name="therapist">
                                <Icon type="ios-navigate"></Icon>
                                咨询师管理
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


                            <Submenu name="base">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    基础信息
                                </template>
                                <MenuItem name="level">等级设置</MenuItem>
                            </Submenu>


                            <Submenu name="setting">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    个人中心
                                </template>
                                <MenuItem name="passModify">修改密码</MenuItem>
                                <MenuItem name="logout" >退出登录</MenuItem>
                            </Submenu>
                        </template>

                        <template v-if="role===Role.therapist">


                            <MenuItem name="time">
                                <Icon type="ios-navigate"></Icon>
                                时间管理
                            </MenuItem>

                            <MenuItem name="fee">
                                <Icon type="ios-navigate"></Icon>
                                收费设置
                            </MenuItem>

                            <MenuItem name="revenue">
                                <Icon type="ios-navigate"></Icon>
                                收入查看
                            </MenuItem>

                            <MenuItem name="tax">
                                <Icon type="ios-navigate"></Icon>
                                设定报税
                            </MenuItem>

                            <MenuItem name="preCheck">
                                <Icon type="ios-navigate"></Icon>
                                预检表
                            </MenuItem>

                            <Submenu name="myAppoint">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    我的来访
                                </template>
                                <MenuItem name="appointList">咨询访客记录</MenuItem>
                                <MenuItem name="waitlist">等待名单</MenuItem>
                                <MenuItem name="preCheck">预检表</MenuItem>
                            </Submenu>

                            <Submenu name="setting">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    个人中心
                                </template>
                                <MenuItem name="functionSet">功能设置</MenuItem>
                                <MenuItem name="education">继续教育</MenuItem>
                                <MenuItem name="type">设置咨询类型</MenuItem>
                                <MenuItem name="emergency">紧急咨询</MenuItem>
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

                if (!this.isLogin && !(to.path === '/user/login' || to.path === '/user/register')) {
                    this.$router.push('/user/login')
                }
                //
                //
                //
                // if (to.path === '/user/login' || to.path === '/user/register') {
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

                    case 'division':
                        this.$router.push('/division/list')
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
                    case 'level':
                        this.$router.push('/levelType/list')
                        break;
                    case 'manner':
                        this.$router.push('/mannerType/list')
                        break;
                    case 'qualification':
                        this.$router.push('/qualificationType/list')
                        break;
                    case 'school':
                        this.$router.push('/schoolType/list')
                        break;
                    case 'consult':
                        this.$router.push('/consultType/list')
                        break;

                    case 'station':
                        this.$router.push('/station/list')
                        break;

                    case 'appointList':
                        this.$router.push('/appoint/list')
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
