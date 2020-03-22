import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'


import * as types from '@/common/types/mutation.js'

import Cookies from 'js-cookie'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../components/MyFinance.vue'),
        meta: {
            title: '首页',
            requiresAuth: true
        },
    },

    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: '首页',
            requiresAuth: true
        },
    },
    {
        path: '/finance',
        name: 'finance',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/MyFinance.vue'),
        meta: {
            title: '账本',
            requiresAuth: true
        },
    },
    {
        path: '/pageLogin',
        name: 'pageLogin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue'),
        meta: {
            title: '登录',
            requiresAuth: false,
            isShowTabbar:false
        },
    },
    {
        path: '/finList',
        name: 'finList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/FinList.vue'),
        meta: {
            title: '账单列表',
            requiresAuth: true
        },
    },
    {
        path: '/finReport',
        name: 'finReport',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/FinReport.vue'),
        meta: {
            title: '账单列表',
            requiresAuth: true
        },
    },
    {
        path: '/finStatistics',
        name: 'finStatistics',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/FinStatistics.vue'),
        meta: {
            title: '统计',
            requiresAuth: true
        },
    },
    {
        path: '/finDayCount',
        name: 'finDayCount',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route

        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/statistics/FinDayCount.vue'),
        meta: {
            title: '日消费统计',
            requiresAuth: true
        },
    },
    {
        path: '/userPage',
        name: 'userPage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route

        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/UserPage.vue'),
        meta: {
            title: '我的',
            requiresAuth: true
        },
    },
    {
        path: '/test',
        name: 'testVanPicker',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/TestVanPicker.vue'),
        meta: {
            title: '测试vanPicker',
            requiresAuth: false
        },
    }

]

const router = new VueRouter({
    routes
})

//let storeCookies = Cookies.get('store')
//Cookies.get('store')
if (Cookies.get('store')) {
    //localStorage.getItem('store')
    debugger
    //let sessionStore = localStorage.getItem('store');

    //store.replaceState(Object.assign({}, store.state,JSON.parse(localStorage.getItem("store"))));
    store.replaceState(Object.assign({}, store.state,JSON.parse(Cookies.get('store'))));
    //store.commit(types.LOGIN, window.sessionStorage.getItem('token'));
}

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title
    //let isLogin = store.state.isLogin
    //console.log(isLogin)
    // console.log("测试输出")
    console.log("isLogin:"+store.state.sys.isLogin)
    console.log("token:"+store.state.sys.token);

    debugger
    if (title) {
        document.title = title
    }

//   store.commit(types.SYS + types.LOGOUT);
//   store.commit(types.SYS + types.PUT_TOCKEN,'JIEJFIEWOXNK*EJ');
//
    let isLogin = store.state.sys.isLogin
    debugger
    if (to.matched.some(r => r.meta.requiresAuth)) {

        console.log("fullPath:" + to.fullPath)
        if (isLogin) {  // 通过vuex 如果当前有登录
            next();
        }
        else {
            next({
                path: '/pageLogin',
                query:{redirect: to.fullPath}
            })
        }

    }else{
        next();
    }
});


export default router
