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




    ]
})

router.afterEach((to,from,next)=>{




    //切换路由时菜单动态跟随切换
        store.commit('activeMenuName',to.meta.activeName)

})

export default router
