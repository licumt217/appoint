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
const user_administratorList = r => require.ensure([], () => r(require('../pages/user/administratorList')), 'user_administratorList')
const user_administratorOperate = r => require.ensure([], () => r(require('../pages/user/administratorOperate')), 'user_administratorOperate')


const divisionManager_list = r => require.ensure([], () => r(require('../pages/divisionManager/list')), 'divisionManager_list_list')
const divisionManager_operate = r => require.ensure([], () => r(require('../pages/divisionManager/operate')), 'divisionManager_operate')

const caseManager_list = r => require.ensure([], () => r(require('../pages/caseManager/list')), 'caseManager_list')
const caseManager_operate = r => require.ensure([], () => r(require('../pages/caseManager/operate')), 'caseManager_operate')

const therapist_list = r => require.ensure([], () => r(require('../pages/therapist/list')), 'therapist_list')
const therapist_operate = r => require.ensure([], () => r(require('../pages/therapist/operate')), 'therapist_operate')

const therapist_levelList = r => require.ensure([], () => r(require('../pages/therapist/levelList')), 'therapistLevel_list')
const therapist_levelOperate = r => require.ensure([], () => r(require('../pages/therapist/levelOperate')), 'therapistLevel_operate')

const therapist_revenueList = r => require.ensure([], () => r(require('../pages/therapist/revenueList')), 'therapistRevenue_list')


const complain_userList = r => require.ensure([], () => r(require('../pages/complain/userList')), 'complain_userList')
const complain_therapistList = r => require.ensure([], () => r(require('../pages/complain/therapistList')), 'complain_therapistList')




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
        },{
            path:'/user/administratorList',
            component:user_administratorList
        },{
            path:'/user/administratorOperate',
            component:user_administratorOperate
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
            path:'/therapist/levelList',
            component:therapist_levelList
        },{
            path:'/therapist/levelOperate',
            component:therapist_levelOperate
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
        }





    ]
})

router.afterEach((to,from,next)=>{




    //切换路由时菜单动态跟随切换
        store.commit('activeMenuName',to.meta.activeName)

})

export default router
