import store from '../store'
import axios from 'axios'
// axios 配置
axios.defaults.timeout = 20000;
axios.defaults.baseURL = '';

let baseURL = 'http://www.zhuancaiqian.com/appoint_wx/'


if(location.href.includes('localhost')){
    baseURL = ''
}


// http request 拦截器
axios.interceptors.request.use(
    config => {
debugger
        config.url = baseURL + config.url
        config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        config.headers.question_token = sessionStorage.getItem("question_token")||'';
        config.headers.question_userId = sessionStorage.getItem("question_userId")||'';

        return config;
    },
    err => {
        debugger
        return Promise.reject(err);
    });
// http response 拦截器
axios.interceptors.response.use(
    response => {
debugger
        if(response.data.isSuccess==="2"){
            debugger
            return Promise.reject(response.data.errorMsg);
        }else if(response.data.isSuccess==="1"){
            debugger
            return Promise.reject(response.data.errorMsg);
        }else if(response.data.isSuccess==="0"){
            debugger
            return Promise.resolve(response.data.data);
        }

    },
    error => {
debugger

        let errorMsg="请求异常"
        if(error.message && error.message==='Network Error'){
            errorMsg="网络异常"
        }else if(error.response.status===404){
            errorMsg="请求地址不存在"
        }


        return Promise.reject(errorMsg)

    }
);

export default axios;
