import axios from 'axios'

let baseURL = 'http://47.92.74.29:8360/'

let hqAxios = axios.create({
  baseURL: baseURL
})

hqAxios.defaults.timeout = 20000

// http request 拦截器
hqAxios.interceptors.request.use(
    config => {

        config.url = baseURL + config.url
        config.responseType='blob'
        config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        config.headers.token = sessionStorage.getItem("token")||'';
        config.headers.userId = sessionStorage.getItem("user_id")||'';

        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
hqAxios.interceptors.response.use(
    response => {

        return Promise.resolve(response);

    },
    error => {


        let errorMsg="请求异常"
        if(error.message && error.message==='Network Error'){
            errorMsg="网络异常"
        }else if(error.response.status===404){
            errorMsg="请求地址不存在"
        }


        return Promise.reject(errorMsg)

    }
);

export const downloadService = {
  request: (url = '', params={}) => {
    return hqAxios['post'](url, params)
  }
}
