<template>
    <div id="app">
        <div>
            <router-view/>
        </div>
        <van-tabbar route v-if="isShow" active-color="#fe7844" v-model="active">
            <van-tabbar-item replace to="/finance" icon="edit">
                记账
            </van-tabbar-item>
            <van-tabbar-item replace to="/finReport" icon="description">
                账单
            </van-tabbar-item>
            <van-tabbar-item replace to="/finStatistics" icon="chart-trending-o">
                统计
            </van-tabbar-item>
            <van-tabbar-item replace to="/userPage" icon="user-circle-o">
                我的
            </van-tabbar-item>
        </van-tabbar>



    </div>
</template>

<script>
    import Cookies from 'js-cookie'

    export default {
        name: 'app',
        data(){
          return {
              isShow: true,
              active: 0
          }
        },
        watch: {
            $route: {
                handler: function(route) {
                    debugger
                    if(route.meta.isShowTabbar != undefined && !route.meta.isShowTabbar){
                        this.isShow = false
                    }else{
                        this.isShow = true
                    }
                },
                immediate: true
            }
        },
        created () {
            //在页面加载时读取sessionStorage里的状态信息
            debugger
            // let cookieStore = Cookies.get("store")
            // if(cookieStore){
            //     Cookies.remove('store')
            // }

            //localStorage.getItem("store")
            if (Cookies.get("store") ) {

                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(Cookies.get("store"))));
                Cookies.remove("store")
                //localStorage.removeItem('store');
            }

            //在页面刷新时将vuex里的信息保存到sessionStorage里

            window.addEventListener("beforeunload",()=>{
                debugger
                let tmpStore = JSON.stringify(this.$store.state)
                let storage = JSON.parse(tmpStore)
                if(storage.sys.isLogin){
                    Cookies.set("store",JSON.stringify(this.$store.state),{expires:7})
                    //localStorage.setItem("store",JSON.stringify(this.$store.state))
                }
            })
        }
    }
</script>


<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
