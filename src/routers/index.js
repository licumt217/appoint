import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)



const homepage = r => require.ensure([], () => r(require('../pages/homepage')), 'homepage')


const user_login = r => require.ensure([], () => r(require('../pages/user/login')), 'user_login')
const user_register = r => require.ensure([], () => r(require('../pages/user/register')), 'user_register')
const user_detail = r => require.ensure([], () => r(require('../pages/user/detail')), 'user_detail')
const user_list = r => require.ensure([], () => r(require('../pages/user/list')), 'user_list')
const user_operate = r => require.ensure([], () => r(require('../pages/user/operate')), 'user_operate')

const divisionManager_list = r => require.ensure([], () => r(require('../pages/divisionManager/list')), 'divisionManager_list_list')
const divisionManager_operate = r => require.ensure([], () => r(require('../pages/divisionManager/operate')), 'divisionManager_operate')

const caseManager_list = r => require.ensure([], () => r(require('../pages/caseManager/list')), 'caseManager_list')
const caseManager_operate = r => require.ensure([], () => r(require('../pages/caseManager/operate')), 'caseManager_operate')

const therapist_list = r => require.ensure([], () => r(require('../pages/therapist/list')), 'therapist_list')
const therapist_operate = r => require.ensure([], () => r(require('../pages/therapist/operate')), 'therapist_operate')

const therapist_revenueList = r => require.ensure([], () => r(require('../pages/therapist/revenueList')), 'therapistRevenue_list')


const complain_userList = r => require.ensure([], () => r(require('../pages/complain/userList')), 'complain_userList')
const complain_therapistList = r => require.ensure([], () => r(require('../pages/complain/therapistList')), 'complain_therapistList')

const blackList_list = r => require.ensure([], () => r(require('../pages/blackList/list')), 'blackList_list')

const ethicsNotice_list = r => require.ensure([], () => r(require('../pages/ethicsNotice/list')), 'ethicsNotice_list')
const ethicsNotice_operate = r => require.ensure([], () => r(require('../pages/ethicsNotice/operate')), 'ethicsNotice_operate')

const preCheck_list = r => require.ensure([], () => r(require('../pages/preCheck/list')), 'preCheck_list')
const preCheck_operate = r => require.ensure([], () => r(require('../pages/preCheck/operate')), 'preCheck_operate')

const room_list = r => require.ensure([], () => r(require('../pages/room/list')), 'room_list')
const room_operate = r => require.ensure([], () => r(require('../pages/room/operate')), 'room_operate')
const room_occupy = r => require.ensure([], () => r(require('../pages/room/occupy')), 'room_occupy')


const schoolType_list = r => require.ensure([], () => r(require('../pages/schoolType/list')), 'schoolType_list')
const qualificationType_list = r => require.ensure([], () => r(require('../pages/qualificationType/list')), 'qualificationType_list')
const mannerType_list = r => require.ensure([], () => r(require('../pages/mannerType/list')), 'mannerType_list')
const levelType_list = r => require.ensure([], () => r(require('../pages/levelType/list')), 'levelType_list')




const router=new VueRouter({
    base:'appoint',
    // mode:'history',
    routes:[
        {
            path:'/',
            component:homepage
        },

        //user
        {
            path:'/user/list',
            component:user_list
        },
        {
            path:'/user/login',
            component:user_login
        },{
            path:'/user/register',
            component:user_register
        },{
            path:'/user/detail',
            component:user_detail
        },{
            path:'/user/operate',
            component:user_operate
        },


        //divisionManager
        {
            path:'/divisionManager/list',
            component:divisionManager_list
        },{
            path:'/divisionManager/operate',
            component:divisionManager_operate
        },

        //caseManager
        {
            path:'/caseManager/list',
            component:caseManager_list
        },{
            path:'/caseManager/operate',
            component:caseManager_operate
        },

        //therapist
        {
            path:'/therapist/list',
            component:therapist_list
        },{
            path:'/therapist/operate',
            component:therapist_operate
        },
        {
            path:'/therapist/revenueList',
            component:therapist_revenueList
        },

        //complain
        {
            path:'/complain/userList',
            component:complain_userList
        },{
            path:'/complain/therapistList',
            component:complain_therapistList
        },

        //blackList
        {
            path:'/blackList/list',
            component:blackList_list
        },

        //ethicsNotice
        {
            path:'/ethicsNotice/list',
            component:ethicsNotice_list
        },
        {
            path:'/ethicsNotice/operate',
            component:ethicsNotice_operate
        },

        //preCheck
        {
            path:'/preCheck/list',
            component:preCheck_list
        },
        {
            path:'/preCheck/operate',
            component:preCheck_operate
        },

        //room
        {
            path:'/room/list',
            component:room_list
        },
        {
            path:'/room/operate',
            component:room_operate
        },
        {
            path:'/room/occupy',
            component:room_occupy
        },


        //constant

        {
            path:'/schoolType/list',
            component:schoolType_list
        },{
            path:'/qualificationType/list',
            component:qualificationType_list
        },{
            path:'/mannerType/list',
            component:mannerType_list
        },{
            path:'/levelType/list',
            component:levelType_list
        },





    ]
})

router.afterEach((to,from,next)=>{




    //切换路由时菜单动态跟随切换
        store.commit('activeMenuName',to.meta.activeName)

})

export default router
