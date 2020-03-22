
import axios from 'axios'
import Vue from 'vue';
import { Toast } from 'vant';
import router from '@/router'
import store from '@/store'
//import {serviceAddr} from "{process.env.BASE_URL}/public/sysConsts.js"

import * as types from '@/common/types/mutation.js'


Vue.use(Toast);

// axios 配置
// axios.defaults.timeout = 5000;
//axios.defaults.baseURL = './service';
axios.defaults.baseURL = 'http://192.168.3.18:9000/service';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// http request 拦截器

axios.interceptors.request.use(
    config => {
        config.headers.common['token'] = store.state.sys.token;
        config.headers.common['Cache-Control'] = 'no-cache';
        config.headers.Pragma = 'no-cache';
        // if (store.state.token) {
        //
        // };

        //尝试拦截请求内容；
        // var urlStr = config.url;
        // console.log(urlStr.substring(7))
        // if (urlStr.includes('/testca')){
        //     var a = urlStr.substring(7)

        //     config.url = '/testca/api'+a;
        // }
        // console.log('获取请求实体的内容',config)

        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {

        debugger;
        let rspCode = response.data.code;
        let isRefresh = response.headers.refresh;
        //刷新token
        if(isRefresh != undefined && isRefresh == "Y"){
            let token = response.headers.token
            store.commit(types.SYS + types.PUT_TOKEN,token);
        }


        let errorCode = [300100,300200,300300]
        let status = errorCode.indexOf(rspCode);
        if (typeof rspCode != "undefined" && status != -1){
            Toast.fail(response.data.msg)
            store.commit(types.SYS + types.LOGOUT);
            router.replace({
                path: '/pageLogin',
                query: { redirect: router.currentRoute.fullPath }
            });

        }else if('200' == rspCode){
            return response.data;
        }else{
            Toast.fail(response.data.msg)
            return response.data
        }
        return response;
    },
    error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 401 清除token信息并跳转到登录页面
//                     store.commit(types.LOGOUT);
//                     router.replace({
//                         path: '/login',
//                         query: {redirect: router.currentRoute.fullPath}
//                     });
//                     break;
//                 case 403:
//                     Busvue.$message({
//                         message: '您没有该功能使用权限。',
//                         type: 'error'
//                     });
//                     break;
//                 case 504:
//                     Busvue.$message({
//                         message: '网络超时，请重试',
//                         type: 'error'
//                     });
//                     break;
//
//             }
//         }else{
//
//             store.commit(types.LOGOUT);
//             router.replace({
//                 path: '/login',
//                 query: { redirect: router.currentRoute.fullPath }
//             });
//         }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        debugger
        console.log("axios", error);
        return Promise.reject(error.response.data);
    });

export default axios;
 
 

 

 

 

 
