import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import administratorList from "../pages/user/administratorList";
import administratorOperate from "../pages/user/administratorOperate";

Vue.use(VueRouter)



const homepage = r => require.ensure([], () => r(require('../pages/homepage')), 'homepage')


const user_login = r => require.ensure([], () => r(require('../pages/user/login')), 'user_login')
const user_register = r => require.ensure([], () => r(require('../pages/user/register')), 'user_register')
const user_detail = r => require.ensure([], () => r(require('../pages/user/detail')), 'user_detail')
const user_list = r => require.ensure([], () => r(require('../pages/user/list')), 'user_list')
const user_operate = r => require.ensure([], () => r(require('../pages/user/operate')), 'user_operate')




const user_administratorList = r => require.ensure([], () => r(require('../pages/user/administratorList')), 'user_administratorList')
const user_administratorOperate = r => require.ensure([], () => r(require('../pages/user/administratorOperate')), 'user_administratorOperate')



const userGroup_list = r => require.ensure([], () => r(require('../pages/userGroup/list')), 'userGroup_list')
const userGroup_operate = r => require.ensure([], () => r(require('../pages/userGroup/operate')), 'userGroup_operate')

const statistics_list = r => require.ensure([], () => r(require('../pages/statistics/list')), 'statistics_list')

const paper_list = r => require.ensure([], () => r(require('../pages/paper/list')), 'paper_list')
const paper_detail = r => require.ensure([], () => r(require('../pages/paper/detail')), 'paper_detail')

const measure_list = r => require.ensure([], () => r(require('../pages/measure/list')), 'measure_list')
const measure_detail = r => require.ensure([], () => r(require('../pages/measure/detail')), 'measure_detail')
const measure_operate = r => require.ensure([], () => r(require('../pages/measure/operate')), 'measure_operate')
const measure_group = r => require.ensure([], () => r(require('../pages/measure/group')), 'measure_group')


const router=new VueRouter({
    base:'questionpc',
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

        //统计管理
        {
            path:'/statistics/list',
            component:statistics_list
        },

        //问卷管理
        {
            path:'/paper/list',
            component:paper_list
        },{
            path:'/paper/detail',
            component:paper_detail
        },

        //量表管理
        {
            path:'/measure/list',
            component:measure_list
        },{
            path:'/measure/detail',
            component:measure_detail
        },{
            path:'/measure/operate',
            component:measure_operate
        },{
            path:'/measure/group',
            component:measure_group
        },

        //userGroup
        {
            path:'/userGroup/list',
            component:userGroup_list
        },{
            path:'/userGroup/operate',
            component:userGroup_operate
        },


    ]
})

router.afterEach((to,from,next)=>{




    //切换路由时菜单动态跟随切换
        store.commit('activeMenuName',to.meta.activeName)

})

export default router
