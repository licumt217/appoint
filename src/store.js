import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    //防止页面刷新状态丢失
    isLogin:sessionStorage.getItem("isLogin")==='true'?true:false,
    userId:sessionStorage.getItem("userId")||'',
    question_role:sessionStorage.getItem("question_role")||'',
    activeMenuName:sessionStorage.getItem("activeMenuName")||'1-1',
    username:sessionStorage.getItem("username")||'',
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{},
    menuList:sessionStorage.getItem("menuList")?JSON.parse(sessionStorage.getItem("menuList")):[],
    titleList:sessionStorage.getItem("titleList")?JSON.parse(sessionStorage.getItem("titleList")):[]
}

const getters={
    isLogin:(state)=>{

        console.log(1)

        return sessionStorage.getItem("isLogin")==='yes';
    },
    userId:(state)=>{

        return sessionStorage.getItem("userId")||'';
    },

}

const mutations={
    isLogin:(state,value)=>{
        sessionStorage.setItem("isLogin",value)
        state.isLogin=value
    },
    userId:(state,value)=>{
        sessionStorage.setItem("userId",value)
        state.userId=value
    },
    question_role:(state,value)=>{
        sessionStorage.setItem("question_role",value)
        state.question_role=value
    },
    username:(state,value)=>{
        sessionStorage.setItem("username",value)
        state.username=value
    },
    activeMenuName:(state,value)=>{
        sessionStorage.setItem("activeMenuName",value)
        state.activeMenuName=value
    },
    userInfo:(state,value)=>{
        sessionStorage.setItem("userInfo",JSON.stringify(value))
        state.userInfo=value
    },
    menuList:(state,value)=>{
        sessionStorage.setItem("menuList",JSON.stringify(value))
        state.menuList=value
    },
    titleList:(state,value)=>{
        sessionStorage.setItem("titleList",JSON.stringify(value))
        state.titleList=value
    },
    reset(state){
        for(let key in state){
            state[key]=undefined;
        }

        let keyArray=['isLogin','userId','activeMenuName','username','userInfo','menuList','question_role']

        keyArray.forEach((key)=>{
            sessionStorage.removeItem(key)
        })

        sessionStorage.removeItem("question_token")
        sessionStorage.removeItem("question_userId")
    }
}

export default new Vuex.Store({state,getters,mutations})
